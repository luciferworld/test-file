const fs = require('fs');
const { scheduleJob } = require('node-schedule');
const { G4F } = require("g4f");

const g4f = new G4F();

const userConversationsFile = 'user_conversations.json';
const userLogsFile = 'user_logs.json';

if (!fs.existsSync(userConversationsFile)) {
    fs.writeFileSync(userConversationsFile, '{}', 'utf8');
    console.log('user_conversations.json created successfully.');
}

let userConversations = {};

try {
    userConversations = JSON.parse(fs.readFileSync(userConversationsFile, 'utf8'));
    console.log('User conversations loaded.');
} catch (err) {
    console.error('Error loading user conversations:', err);
}

scheduleJob('0 */6 * * *', cleanupMessages);

function cleanupMessages() {
    const currentTime = Date.now();
    for (const userId in userConversations) {
        const userMessages = userConversations[userId].conversations;
        for (let i = userMessages.length - 1; i >= 0; i--) {
            const messageTimestamp = new Date(userMessages[i].timestamp).getTime();
            if (currentTime - messageTimestamp >= 6 * 60 * 60 * 1000) {
                userMessages.splice(i, 1);
            }
        }
    }
    fs.writeFileSync(userConversationsFile, JSON.stringify(userConversations), 'utf8');
}

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
    async: async (m, { client, setting, Scraper, Func }) => {
        try {
            if ((m.quoted && m.quoted.mtype === 'imageMessage') || (m.mtype === 'imageMessage' && m.text)) {
                let q = m.quoted ? m.quoted : m;
                let mime = (q.msg || q).mimetype || '';
                if (mime.includes('image')) {
                    let img = await client.downloadMediaMessage(q.msg || q);
                    let image = await Scraper.uploadImageV2(img);
                    let text = '';
                    if (m.text) {
                        text = encodeURIComponent(m.text);
                    } else if (q.caption) {
                        text = encodeURIComponent(q.caption);
                    }
                    let apiURL = `https://api.betabotz.eu.org/api/search/bard-img?url=${image.data.url}&apikey=beta-Ibrahim1209`;
                    if (text) {
                        apiURL += `&text=${text}`;
                    }
                    const data = await Func.fetchJson(apiURL);
                    m.reply(data.result);
                } else {
                    console.error('Error: Media message not found');
                }
            } else if (m.text) {
                const userId = `${m.chat}`;
                if (!userConversations[userId]) {
                    userConversations[userId] = { conversations: [], messageCount: 0 };
                    client.reply(m.chat, 'Welcome! You can start chatting. If you want to clear your conversation history, use /new.', m);
                }
                if (m.text === '/new') {
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

                fs.writeFileSync(userConversationsFile, JSON.stringify(userConversations), 'utf8');

                if (userConversations[userId].messageCount >= 8) {
                    userConversations[userId].messageCount = 0;
                    client.reply(m.chat, 'If you want to start a new chat, use /new.', m);
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
