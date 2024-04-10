const { imagine } = require("nayan-server");

exports.run = {
    usage: ['imagine'],
    use: 'query',
    category: 'generativeai',
    async: async (m, { client, text, Func }) => {
        try {
            const promt = "cat, 4k" // your promt
            imagine(promt).then(data => {
            console.log(data)
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
