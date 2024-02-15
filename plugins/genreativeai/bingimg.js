const bimg = require("bimg-new");

exports.run = {
    usage: ['bing3'],
    use: 'query',
    category: 'generativeai',
    async async (m, {
        client,
        text,
        args,
        isPrefix,
        command,
        Func
    }) {
        try {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'girl'), m)
            client.sendReact(m.chat, '🕒', m.key)
            const imageLinks = await bimg.generateImagesLinks(text)
            m.reply(imageLinks)
        } catch (e) {
            return client.reply(m.chat, global.status.error, m)
        }
    },
    error: false,
    limit: true,
    premium: false,
};