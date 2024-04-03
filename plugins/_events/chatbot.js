const fs = require('fs');
const { scheduleJob } = require('node-schedule');
const { G4F } = require("g4f");

const g4f = new G4F();

const logsFolderPath = './logs/';

// Ensure logs folder exists
if (!fs.existsSync(logsFolderPath)){
    fs.mkdirSync(logsFolderPath);
}

// Function to load user conversations from file
function loadUserConversations(userId) {
    const userLogFilePath = `${logsFolderPath}${userId}.json`;
    try {
        if (!fs.existsSync(userLogFilePath)) {
            fs.writeFileSync(userLogFilePath, '[]', 'utf8');
            console.log(`Log file created for user ${userId}.`);
        }
        return JSON.parse(fs.readFileSync(userLogFilePath, 'utf8'));
    } catch (err) {
        console.error(`Error loading user log for ${userId}:`, err);
        return [];
    }
}

// Function to save user conversations to file
function saveUserConversations(userId, userConversations) {
    const userLogFilePath = `${logsFolderPath}${userId}.json`;
    try {
        fs.writeFileSync(userLogFilePath, JSON.stringify(userConversations), 'utf8');
        console.log(`User log saved successfully for ${userId}.`);
    } catch (err) {
        console.error(`Error saving user log for ${userId}:`, err);
    }
}

// Function to clear conversation history for a user
function clearUserConversationHistory(userId) {
    const userLogFilePath = `${logsFolderPath}${userId}.json`;
    try {
        if (fs.existsSync(userLogFilePath)) {
            fs.unlinkSync(userLogFilePath);
            console.log(`Log file deleted for user ${userId}.`);
            return true;
        }
        console.log(`No log file found for user ${userId}.`);
        return false;
    } catch (err) {
        console.error(`Error deleting log file for ${userId}:`, err);
        return false;
    }
}

// Schedule job to run every 6 hours for message cleanup
scheduleJob('0 */6 * * *', cleanupMessages);

function cleanupMessages() {
    // Implement message cleanup logic here
}

exports.run = {
    async: async (m, { client }) => {
        try {
            const userId = `${m.chat}`;
            const userConversations = loadUserConversations(userId);
            
            // Handle "/new" command
            if (m.text === '/new') {
                if (clearUserConversationHistory(userId)) {
                    return client.reply(m.chat, 'Your conversation history has been cleared.', m);
                } else {
                    return client.reply(m.chat, 'No conversation history to clear.', m);
                }
            }
            
            // Send welcome message only if it's the user's first interaction
            if (!userConversations[userId] || userConversations[userId].conversations.length === 0) {
                client.reply(m.chat, 'Welcome! You can start chatting. If you want to clear your conversation history, use /new.', m);
            }
            
            // Handle other messages
            if (m.text) {
                if (!userConversations[userId]) {
                    userConversations[userId] = { conversations: [], messageCount: 0 };
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

                saveUserConversations(userId, userConversations);
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
