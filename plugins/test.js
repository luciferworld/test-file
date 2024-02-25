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
                if (err != null) {
                    console.log(err);
                    return client.reply(m.chat, global.status.error, m); // Notify user of error
                }

                const prompt = data.prompt; // Extract prompt from response
                const images = data.images; // Extract images array from response

                images.forEach((imageData, index) => {
                    const buffer = Buffer.from(imageData.split(';base64,').pop(), 'base64');
                    client.sendFile(m.chat, buffer, `image_${index + 1}.jpg`, `◦  *Prompt* : ${prompt}`, m);
                });
            });
        } catch (e) {
            console.error(e);
            return client.reply(m.chat, global.status.error, m);
        }
    },
    error: false,
    limit: true,
    premium: false,
    verified: true,
};