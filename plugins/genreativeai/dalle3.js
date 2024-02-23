const {dallE} = require("haji-api/modules/ai");
exports.run = {
    usage: ['dalle3'],
    use: 'query',
    category: 'generativeai',
    async: async (m, {
        client,
        text,
        args,
        isPrefix,
        command,
        Func
    }) => {
        try {
            dallE({
                prompt: "a cat"
            }).then(console.log);
        } catch (e) {
            return client.reply(m.chat, global.status.error, m)
        }
    },
    error: false,
    limit: true,
    premium: false,
    verified: true,
}

