const { bing } = require("gpti");
exports.run = {
    usage: ['test'],
    use: 'prompt',
    category: 'ai',
    async: async (m, {
        client,
        text,
        isPrefix,
        command,
        Func
    }) => {
        try {



            bing({
                messages: [
                    {
                        role: "user",
                        content: "Can you tell me how many movies you've told me about?"
                    }
                ],

                conversation_style: "Balanced",
                markdown: false,
                stream: false,
            }, (err, data) => {
                if (err != null) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        } catch (e) {
            client.reply(m.chat, Func.jsonFormat(e), m);
        }
    },
    error: false,
    limit: true,
    cache: true,
    verified: true,
    location: __filename
};
