const botModule = import("sydney-ai");

exports.run = {
    usage: ['mygf'],
    use: 'query ',
    category: 'ai',
    run: async function(m, { client, text, isPrefix, command }) {
        try {
            const bot = await botModule;
            if (!text) return client.reply(m.chat, 'Usage: !mygf <query>', m); // Provide proper usage
            client.sendReact(m.chat, '🕒', m.key); // Assuming sendReact sends a reaction to the message
            let response = await bot.ask(text);
            m.reply(response);
        } catch (e) {
            return client.reply(m.chat, 'An error occurred.', m); // Provide a proper error message
        }
    },
    error: false,
    limit: true,
    verified: true,
    premium: false
};
