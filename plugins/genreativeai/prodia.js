const { RsnChat } = require("rsnchat");
const rsnchat = new RsnChat(process.env.RSGPT);
exports.run = {
    usage: ['diffusion'],
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
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'a girl'), m)
            client.sendReact(m.chat, '🕒', m.key)
            const negative_prompt = "blury, bad quality";
            const model = "absolutereality_v181.safetensors [3d9d4d2b]";
            const json = await rsnchat.prodia(text, negative_prompt, model)
            const buffer = Buffer.from(json.base64)
            client.sendFile(m.chat, buffer, 'image.jpg', `◦  *Prompt* : ${text}`, m)
        } catch (e) {
            return client.reply(m.chat, global.status.error, m)
        }
    },
    error: false,
    limit: true,
    premium: false,
}
