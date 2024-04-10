const { imagine } = require("nayan-server");

exports.run = {
    usage: ['imagine'],
    use: 'query',
    category: 'generativeai',
    async: async (m, { client, text, Func }) => {
        try {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'a girl'), m)
            client.sendReact(m.chat, '🕒', m.key)
            const promt = text // your promt
            imagine(promt).then(data => {
                client.sendFile(m.chat, data.image_url, 'image.jpg', `◦  *Prompt* : ${text}`, m)
            
          });  
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
