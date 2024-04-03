const fs = require('fs');
const { scheduleJob } = require('node-schedule');
const { G4F } = require("g4f");

const g4f = new G4F();

const logsFolderPath = './logs/';
const interactedUsersFile = 'interacted_users.json'; // File to store user IDs

// Ensure logs folder exists
if (!fs.existsSync(logsFolderPath)){
    fs.mkdirSync(logsFolderPath);
}

// Ensure interacted users file exists
if (!fs.existsSync(interactedUsersFile)) {
    fs.writeFileSync(interactedUsersFile, '[]', 'utf8');
}

// Function to load interacted users from file
function loadInteractedUsers() {
    try {
        const fileContent = fs.readFileSync(interactedUsersFile, 'utf8');
        if (!fileContent.trim()) {
            // File is empty, return an empty array
            return [];
        }
        return JSON.parse(fileContent);
    } catch (err) {
        console.error('Error loading interacted users:', err);
        return [];
    }
}

// Function to save interacted users to file
function saveInteractedUsers(interactedUsers) {
    try {
        fs.writeFileSync(interactedUsersFile, JSON.stringify(interactedUsers), 'utf8');
        console.log('Interacted users saved successfully.');
    } catch (err) {
        console.error('Error saving interacted users:', err);
    }
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
            const interactedUsers = loadInteractedUsers();
            
            // Check if the user has interacted with the bot before
            if (!interactedUsers.includes(userId)) {
                // If the user is interacting for the first time, save the user ID
                interactedUsers.push(userId);
                saveInteractedUsers(interactedUsers);
                
                // Send welcome message for first-time interaction
                client.reply(m.chat, 'Welcome! You can start chatting. If you want to clear your conversation history, use /new.', m);
            }
            
            const userConversations = loadUserConversations(userId);
            
            // Handle "/new" command
            if (m.text === '/new') {
                if (clearUserConversationHistory(userId)) {
                    return client.reply(m.chat, 'Your conversation history has been cleared.', m);
                } else {
                    return client.reply(m.chat, 'No conversation history to clear.', m);
                }
            }
            
            // Handle other messages
            if (m.text) {
                if (!userConversations[userId]) {
                    userConversations[userId] = { conversations: [], messageCount: 0 };
                }

                // Save user input to conversation history
                userConversations[userId].conversations.push({ role: "user", content: `${m.text}`, timestamp: new Date() });
                userConversations[userId].messageCount++;
                
                const options = {
                    provider: g4f.providers.GPT,
                    model: "gpt-4",
                    debug: true,
                    proxy: ""
                };

                const resp = await g4f.chatCompletion(userConversations[userId].conversations, options);
                
                // Log the response for debugging
                console.log('Response:', resp);
                
                // Send bot's response
                m.reply(resp);

                // Save bot's response to conversation history
                userConversations[userId].conversations.push({ role: "assistant", content: resp, timestamp: new Date() });

                // Save conversation history to file
                saveUserConversations(userId, userConversations);
            }
        } catch (e) {
            console.error('Error:', e);
            // Log the error for debugging
            client.reply(m.chat, 'An error occurred. Please try again later.', m);
        }
    },
    error: false,
    private: true,
    cache: true,
    premium: true,
    location: __filename
};
