const { RsnChat } = require("rsnchat");
const rsnchat = new RsnChat(process.env.RSGPT);
exports.run = {
    usage: ['dalle'],
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
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'girl'), m)
            client.sendReact(m.chat, '🕒', m.key)
            const json = await rsnchat.dalle(text)
            const buffer = Buffer.from(json.image, 'base64')
            client.sendFile(m.chat, buffer, 'image.jpg', `◦  *Prompt* : ${text}`, m)
        } catch (e) {
            return client.reply(m.chat, global.status.error, m)
        }
    },
    error: false,
    limit: true,
    premium: false,
}
