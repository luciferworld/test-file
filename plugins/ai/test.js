const { G4F } = require("g4f");
const fs = require('fs');
const g4f = new G4F();

const userConversationsFile = 'user_conversations.json';

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

exports.run = {
    usage: ['test', 'test forget'],
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

        // Initialize user data if not exists
        if (!userConversations[userId]) {
            userConversations[userId] = { conversations: [] };
        }

        // Check if the command is 'test forget'
        if (command == 'test forget') {
            // Clear the user's conversation history
            userConversations[userId].conversations = [];
            return client.reply(m.chat, 'Your conversation history has been cleared.', m);
        }

        if (!m.quoted && !text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m);
         
        client.sendReact(m.chat, '🕒', m.key);

        // If there's text, add user's message to the user's conversation array
        if (text) {
            userConversations[userId].conversations.push({ role: "user", content: `${text}` });
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
            userConversations[userId].conversations.push({ role: "assistant", content: resp });

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
