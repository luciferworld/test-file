const { G4F } = require("g4f");
const fs = require('fs');
const g4f = new G4F();
const { scheduleJob } = require('node-schedule'); // Import the node-schedule library

const userConversationsFile = 'user_conversations.json';
const userLogsFile = 'user_logs.json'; // File to store user logs

// Check if the file exists
if (!fs.existsSync(userConversationsFile)) {
    // If the file doesn't exist, create it with an empty object as initial content
    fs.writeFileSync(userConversationsFile, '{}', 'utf8');
    console.log('user_conversations.json created successfully.');
}

// Load conversation data from file
let userConversations = {};

try {
    userConversations = JSON.parse(fs.readFileSync(userConversationsFile, 'utf8'));
    console.log('User conversations loaded.');
} catch (err) {
    console.error('Error loading user conversations:', err);
}

// Schedule job to run every hour for message cleanup
scheduleJob('0 */6 * * *', cleanupMessages);

function cleanupMessages() {
    const currentTime = Date.now();
    for (const userId in userConversations) {
        const userMessages = userConversations[userId].conversations;
        for (let i = userMessages.length - 1; i >= 0; i--) {
            const messageTimestamp = new Date(userMessages[i].timestamp).getTime();
            if (currentTime - messageTimestamp >= 6 * 60 * 60 * 1000) {
                userMessages.splice(i, 1); // Remove message older than 6 hours
            }
        }
    }
    // Save updated user conversations to file
    fs.writeFileSync(userConversationsFile, JSON.stringify(userConversations), 'utf8');
}

// Function to log user when using /test command
function logUser(userId) {
    let userLogs = [];
    try {
        userLogs = JSON.parse(fs.readFileSync(userLogsFile, 'utf8'));
    } catch (err) {
        console.error('Error loading user logs:', err);
    }
    
    if (!userLogs.includes(userId)) {
        userLogs.push(userId);
        fs.writeFileSync(userLogsFile, JSON.stringify(userLogs), 'utf8');
    }
}

exports.run = {
    usage: ['test', 'new'],
    use: 'prompt',
    category: 'ai',
    async: async (m, {
       client,
       text,
       isPrefix,
       command,
       Func
    }) => {
       try {
        const userId = `${m.chat}`;

        // Log user if using /test command
        if (command == 'test') {
            logUser(userId);
        }

        // Initialize user data if not exists
        if (!userConversations[userId]) {
            userConversations[userId] = { conversations: [] };
            // Inform user about starting the bot
            client.reply(m.chat, 'Welcome! You can start chatting. If you want to clear your conversation history, use /new.', m);
        }

        // Check if the command is '/new'
        if (command == 'new') {
            // Clear the user's conversation history
            userConversations[userId].conversations = [];
            return client.reply(m.chat, 'Your conversation history has been cleared.', m);
        }

        if (!m.quoted && !text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m);
         
        client.sendReact(m.chat, '🕒', m.key);

        // If there's text, add user's message to the user's conversation array
        if (text) {
            userConversations[userId].conversations.push({ role: "user", content: `${text}`, timestamp: new Date() });
        }

        const options = {
            provider: g4f.providers.GPT,
            model: "gpt-4",
            debug: true,
            proxy: ""
        };
        
        (async() => {
            // Use the user's conversation array as input for chatCompletion method
            const resp = await g4f.chatCompletion(userConversations[userId].conversations, options);    
            m.reply(resp); 

            // Add the AI response to the user's conversation array
            userConversations[userId].conversations.push({ role: "assistant", content: resp, timestamp: new Date() });

            // Save all user data to file
            fs.writeFileSync(userConversationsFile, JSON.stringify(userConversations), 'utf8');
        })();

          
       } catch (e) {
          client.reply(m.chat, Func.jsonFormat(e), m);
       }
    },
    error: false,
    limit: true,
    cache: true,
    verified: true,
    location: __filename
};
