const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Access API key from environment variable
});

exports.run = {
    usage: ['chatgpt'],
    use: 'query',
    category: 'ai',
    async: async (m, {
        client,
        text,
        args,
        isPrefix,
        command,
        Func
    }) => {
        try {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m)
            client.sendReact(m.chat, '🕒', m.key)
            async function main() {
                const json = await openai.chat.create({
                    model: 'gpt-3.5-turbo',
                    messages: [{
                        role: 'user',
                        content: text
                    }],
                });
            }
            const result = await main();
            client.reply(m.chat, result.data.messages[0].content, m);
        } catch (e) {
            console.error('Error:', e);
            // Handle the error, e.g., send an error message to the client
            return client.reply(m.chat, global.status.error, m);
        }
    },
    error: false,
    limit: true,
    verified: true,
    premium: true,
};
