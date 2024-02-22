const { bing } = require("gpti");
exports.run = {
    usage: ['bing', 'creative', 'precise'],
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
            if (command == 'bing') {
                if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m);
                client.sendReact(m.chat, '🕒', m.key);
                bing({
                    messages: [
                        {
                            role: "assistant",
                            content: "Hello! How can I help you today? 😊"
                        },
                        {
                            role: "user",
                            content: `${text}`
                        },
                    ],
                    conversation_style: "Balanced",
                    markdown: false,
                    stream: false,
                }, (err, data) => {
                    if (err != null) {
                        console.log(err);
                    } else {
                        m.reply(data.message);
                    }
                });
           
            }
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
