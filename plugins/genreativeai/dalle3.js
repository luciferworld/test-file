const { dallE } = require("haji-api/modules/ai");

exports.run = {
    usage: ['dalle3'],
    use: 'query',
    category: 'generativeai',
    async: async (m, { client, text, args, isPrefix, command, Func }) => {
        try {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'long hair'), m);

            client.sendReact(m.chat, '🕒', m.key);

            const results = await dallE({ prompt: `${text}` }); // Assuming results is an array of image URLs
            
            if (Array.isArray(results)) {
                // Send each image to the user
                for (let url of results) {
                    client.sendFile(m.chat, url, 'image.jpg', 'Here is the generated image.', m);
                }
            } else {
                console.log(results); // Log if the results are not in the expected format
            }
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
