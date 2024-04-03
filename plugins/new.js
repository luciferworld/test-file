const fs = require('fs');

const userLogsFile = 'user_logs.json';

// Function to load user logs from file
function loadUserLogs() {
    try {
        if (!fs.existsSync(userLogsFile)) {
            fs.writeFileSync(userLogsFile, '[]', 'utf8');
            console.log('user_logs.json created successfully.');
        }
        return JSON.parse(fs.readFileSync(userLogsFile, 'utf8'));
    } catch (err) {
        console.error('Error loading user logs:', err);
        return [];
    }
}

// Function to save user logs to file
function saveUserLogs(userLogs) {
    try {
        fs.writeFileSync(userLogsFile, JSON.stringify(userLogs), 'utf8');
        console.log('User logs saved successfully.');
    } catch (err) {
        console.error('Error saving user logs:', err);
    }
}

// Function to clear logs for a user
function clearUserLogs(userId) {
    const userLogs = loadUserLogs();
    const index = userLogs.indexOf(userId);
    if (index !== -1) {
        userLogs.splice(index, 1);
        saveUserLogs(userLogs);
        return true;
    }
    return false;
}


    exports.run = {
  usage: ['new'],
    async: async (m, { client }) => {
        try {
             {
                const userId = `${m.chat}`;
                if (clearUserLogs(userId)) {
                    return client.reply(m.chat, 'Your logs have been cleared.', m);
                } else {
                    return client.reply(m.chat, 'No logs to clear.', m);
                }
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
