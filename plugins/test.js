let botHasSentMessage = false;

exports.run = {
    usage: ['test'],
    category: 'beta',
    async: async (m, {
        client,
        args,
        isPrefix,
        command,
        Func,
        text
    }) => {
        try {
            // Check if the bot has sent a message before in this conversation
            if (!botHasSentMessage) {
                const edit = await client.reply(m.chat, 'in progress......', m);
                botHasSentMessage = true; // Set the flag to true after sending the first message
            }
            
            // Your actual processing here
            // For example:
            const response = 'This is the actual response.';
            client.sendEditMessage(m.chat, response, m);
        } catch (e) {
            return client.reply(m.chat, global.status.error, m);
        }
    },
    error: false
};