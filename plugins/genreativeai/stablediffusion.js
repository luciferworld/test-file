const { stablediffusion } = require("gpti");
exports.run = {
    usage: ['stable'],
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
            stablediffusion.v2({
                prompt: "An serene sunset landscape where a river winds through gentle hills covered in trees. The sky is tinged with warm and soft tones, with scattered clouds reflecting the last glimmers of the sun.",
                data: {
                    prompt_negative: "",
                    guidance_scale: 9
                }
            }, (err, data) => {
                if(err != null){
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        } catch (e) {
            return client.reply(m.chat, global.status.error, m)
        }
    },
    error: false,
    limit: true,
    premium: false,
    verified: true,
}
