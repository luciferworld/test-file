const axios = require('axios');

exports.run = {
    usage: ['imagine'],
    use: 'query',
    category: 'generativeai',
    async: async (m, { client, text, Func }) => {
        try {
            // Check if a prompt is provided
            if (!text) {
                return client.reply(m.chat, Func.example(m.prefix, 'imagine', 'cat,fish'), m);
            }

            // Send a reaction to indicate processing
            client.sendReact(m.chat, '🕒', m.key);

            // Make a POST request using Axios
            const response = await axios.post('https://api.itsrose.life/image/stable/diffusion', {
                prompt: text,
                style: 'realistic'
            }, {
                headers: {
                    'Authorization': 'Rk-ibrahim098',
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer' // Set responseType to 'arraybuffer' to get the response as a buffer
            });

            // Send the image as a file
            client.sendFile(m.chat, response.data, 'img.png', `◦  *Prompt* : ${text}`, m);
        } catch (e) {
            console.error(e); // Log the error for debugging
            return client.reply(m.chat, global.status.error, m);
        }
    },
    error: false,
    limit: true,
    premium: false,
    verified: true,
};
