exports.run = {
    async: async (m, { client, setting, Scraper, Func }) => {
        try {
            // Process when the message is a reply to an image or contains an image with a caption
            if ((m.quoted && m.quoted.mtype === 'imageMessage') || (m.mtype === 'imageMessage' && m.text)) {
                let q = m.quoted ? m.quoted : m;
                let mime = (q.msg || q).mimetype || '';
                if (mime.includes('image')) {
                    let img = await client.downloadMediaMessage(q.msg || q);
                    let image = await Scraper.uploadImageV2(img);

                    // Extract text from caption if available
                    let text = '';
                    if (m.text) {
                        text = encodeURIComponent(m.text);
                    } else if (q.caption) {
                        text = encodeURIComponent(q.caption);
                    }

                    // Send data to API using Func.fetchJson
                    let apiURL = `https://api.betabotz.eu.org/api/search/bard-img?url=${image.data.url}&apikey=beta-Ibrahim1209`;
                    if (text) {
                        apiURL += `&text=${text}`;
                    }
                    const data = await Func.fetchJson(apiURL);

                    // Reply with the data from the API
                    m.reply(data.result);
                } else {
                    console.error('Error: Media message not found');
                }
            }

            // Process text message
            else if (m.text) {

                if (!userConversations[userId]) {
                    userConversations[userId] = { conversations: [], messageCount: 0 };
                    // Inform user about starting the bot
                    client.reply(m.chat, 'Welcome! You can start chatting. If you want to clear your conversation history, use /new.', m);
                }
                if (command == 'new') {
                    // Clear the user's conversation history
                    userConversations[userId].conversations = [];
                    return client.reply(m.chat, 'Your conversation history has been cleared.', m);
                }
                if (text) {
                    userConversations[userId].conversations.push({ role: "user", content: `${m.text}`, timestamp: new Date() });
                    userConversations[userId].messageCount++; // Increment message count
                }

                const options = {
                    provider: g4f.providers.GPT,
                    model: "gpt-4",
                    debug: true,
                    proxy: ""
                };

                (async () => {
                    // Use the user's conversation array as input for chatCompletion method
                    const resp = await g4f.chatCompletion(userConversations[userId].conversations, options);
                    m.reply(resp);

                    // Add the AI response to the user's conversation array
                    userConversations[userId].conversations.push({ role: "assistant", content: resp, timestamp: new Date() });

                    // Save all user data to file
                    fs.writeFileSync(userConversationsFile, JSON.stringify(userConversations), 'utf8');

                    // Check if user has sent 8 messages
                    if (userConversations[userId].messageCount >= 8) {
                        // Reset message count
                        userConversations[userId].messageCount = 0;
                        // Inform user about starting a new chat
                        client.reply(m.chat, 'If you want to start a new chat, use /new.', m);
                    }
                })();
                client.reply(m.chat, 'Thank you for your message!', m);
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
