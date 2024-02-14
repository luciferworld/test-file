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
            const prompt = "beautiful girl";
            const negative_prompt = "blury, bad quality";
            const model = "absolutereality_v181.safetensors [3d9d4d2b]";

            rsnchat.prodia(prompt, negative_prompt, model).then((response) => {
                console.log(response);
            });
        } catch (e) {
            return client.reply(m.chat, global.status.error, m)
        }
    },
    error: false,
    limit: true,
    premium: false,
}
