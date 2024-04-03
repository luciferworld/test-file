const fs = require('fs');
const { scheduleJob } = require('node-schedule');
const { G4F } = require("g4f");

const g4f = new G4F();

const userConversationsFile = 'user_conversations.json';
const userLogsFile = 'user_logs.json';

// Function to load user conversations from file
function loadUserConversations() {
    try {
        if (!fs.existsSync(userConversationsFile)) {
            fs.writeFileSync(userConversationsFile, '{}', 'utf8');
            console.log('user_conversations.json created successfully.');
        }
        return JSON.parse(fs.readFileSync(userConversationsFile, 'utf8'));
    } catch (err) {
        console.error('Error loading user conversations:', err);
        return {};
    }
}

// Function to save user conversations to file
function saveUserConversations(userConversations) {
    try {
        fs.writeFileSync(userConversationsFile, JSON.stringify(userConversations), 'utf8');
        console.log('User conversations saved successfully.');
    } catch (err) {
        console.error('Error saving user conversations:', err);
    }
}

// Function to clear conversation history for a user
function clearUserConversationHistory(userId) {
    const userConversations = loadUserConversations();
    if (userConversations[userId]) {
        userConversations[userId] = { conversations: [], messageCount: 0 };
        saveUserConversations(userConversations);
        return true;
    }
    return false;
}

// Schedule job to run every 6 hours for message cleanup
scheduleJob('0 */6 * * *', cleanupMessages);

function cleanupMessages() {
    const currentTime = Date.now();
    const userConversations = loadUserConversations();
    for (const userId in userConversations) {
        const userMessages = userConversations[userId].conversations;
        for (let i = userMessages.length - 1; i >= 0; i--) {
            const messageTimestamp = new Date(userMessages[i].timestamp).getTime();
            if (currentTime - messageTimestamp >= 6 * 60 * 60 * 1000) {
                userMessages.splice(i, 1);
            }
        }
    }
    saveUserConversations(userConversations);
}

exports.run = {
    usage: ['new'],
    async: async (m, { client, setting, Scraper, Func,command }) => {
        try {
            if ((m.quoted && m.quoted.mtype === 'imageMessage') || (m.mtype === 'imageMessage' && m.text)) {
                // Code for processing image messages
            } else if (m.text) {
                const userId = `${m.chat}`;
                const userConversations = loadUserConversations();
                if (!userConversations[userId]) {
                    userConversations[userId] = { conversations: [], messageCount: 0 };
                    client.reply(m.chat, 'Welcome! You can start chatting. If you want to clear your conversation history, use /new.', m);
                }
                if (command == '/new') {
                    // Clear the user's conversation history
                    userConversations[userId].conversations = [];
                    return client.reply(m.chat, 'Your conversation history has been cleared.', m);
                }
                userConversations[userId].conversations.push({ role: "user", content: `${m.text}`, timestamp: new Date() });
                userConversations[userId].messageCount++;
                
                const options = {
                    provider: g4f.providers.GPT,
                    model: "gpt-4",
                    debug: true,
                    proxy: ""
                };

                const resp = await g4f.chatCompletion(userConversations[userId].conversations, options);
                m.reply(resp);

                userConversations[userId].conversations.push({ role: "assistant", content: resp, timestamp: new Date() });

                saveUserConversations(userConversations);

                
            }
        } catch (e) {
            console.error('Error:', e);
        }
    },
    error: false,
    private: true,
    cache: true,
    premium: true,
    location: __filename
};
