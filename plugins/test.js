const { dalle } = require("gpti");

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
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'girl'), m);
            client.sendReact(m.chat, '🕒', m.key);

            dalle.mini({
                prompt: `${text}`
            }, (err, data) => {
                if (err) {
                    console.error(err);
                    return client.reply(m.chat, 'An error occurred while processing your request', m);
                }
                
                const base64ImageData = data.images[0];
                const buffer = Buffer.from(base64ImageData.split(",")[1], 'base64');
                
                client.sendFile(m.chat, buffer, 'image.jpg', `◦  *Prompt* : ${text}`, m);
            });
        } catch (e) {
            console.error(e);
            return client.reply(m.chat, 'An unexpected error occurred', m);
        }
    },
    error: false,
    limit: true,
    premium: false,
    verified: true,
 }