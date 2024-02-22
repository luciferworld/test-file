const { gpt } = require("gpti");

exports.run = {
   usage: ['chatgpt4'],
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
        gpt({
            messages: [
                {
                    role: "assistant",
                    content: "Hello! How are you today?"
                },
                {
                    role: "user",
                    content: "Hello, my name is Yandri."
                },
                {
                    role: "assistant",
                    content: "Hello, Yandri! How are you today?"
                }
            ],
            prompt: "Can you repeat my name?",
            model: "GPT-4",
            markdown: false
        }, (err, data) => {
            if(err != null){
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
