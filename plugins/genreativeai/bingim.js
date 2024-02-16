const axios = require('axios');

exports.run = {
    usage: ['bingimg'],
    use: 'prompt',
    category: 'generativeai',
    async: async (m, { client, text, isPrefix, command, Func, args }) => {
        try {
            if (!text) {
                return client.reply(m.chat, Func.example(isPrefix, command, 'black cat'), m);
            }
            client.sendReact(m.chat, '🕒', m.key);

            const response = await axios.get(`https://api.lolhuman.xyz/api/image-creator/bing?apikey=GataDios&query=${text}`);
            const json = response.data;


            // Check for errors in response
            if (!json || !json.result) {
                throw new Error('Failed to fetch image data.');
            }

            // Check if no images found
            if (!Array.isArray(json.result) || json.result.length === 0) {
                return client.reply(m.chat, `{
                "message": "We are experiencing an server error.

}`, m); // Corrected from 'message.chat' to 'm.chat'
            }
            for (let i = 0; i < json.result.length; i++) {
                client.sendFile(m.chat, json.result[i], 'image.jpg', '', m);
                await Func.delay(1500);
            }

            // Send the final result to the chat

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                client.reply(m.chat, `Error: ${error.response.status} - ${error.response.statusText}`, m);
            } else if (error.request) {
                // The request was made but no response was received
                client.reply(m.chat, 'Error: No response received from the server', m);
            } else {
                // Something happened in setting up the request that triggered an Error
                client.reply(m.chat, `Error: ${error.message}`, m);
            }
        }
    },
    error: false,
    limit: true,
    premium: false,
    cache: true,
    verified: true,
    location: __filename
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
