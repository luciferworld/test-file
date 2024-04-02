const { bing } = require("nayan-bing-api");
const request = require('request')

exports.run = {
    usage: ['bingimg3'],
    use: 'query',
    category: 'generativeai',
    async: async (m, { client, text, Func }) => {
        if (!text) {
            return client.reply(m.chat, Func.example(isPrefix, command, 'black cat'), m);
        }
        m.reply('Sending images, it will take some time');
        
        const key = "Nayan"; // Don't change key
        const cookie = "1LzFVXziZDqg4-9tN3GFR3HSny2O_goiWubhYH3rhrcmx2weTaqPmTSSCf2csToVE2wgUgGMSgyJcV3ZYV42CnmXcHORIrME6Sd7G6rHlhF2guecQsXzMTxlhM8X_Iy9QrpjPaZKeBHKZ_nGugUJu3Re4G0oS1YDi3RZfsgdnD6nWcsivy5-nTFFiS0mRc8QK1Ff8upKRS0yzuyXQfgkYmQ"; // Paste your Bing cookie here
        const query = text;
        
        try {
            const data = await bing(query, cookie, key);
            if (!data.success) {
                return client.reply(m.chat, Func.jsonFormat(data), m);
            }
            
            if (data.result.length === 0) {
                return client.reply(m.chat, 'No images found', m);
            }
            
            for (let i = 0; i < data.result.length; i++) {
                client.sendFile(m.chat, data.result[i], 'image.jpg', '', m);
                await Func.delay(1500); // Delay between sending images
            }
        } catch (error) {
            console.error("Error occurred:", error);
            // Handle error, send a message to the user, etc.
        }
    },
    error: false,
    limit: true,
    premium: false,
    verified: true
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

