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
                
            ],
            prompt: "how are you",
            model: "GPT-4",
            markdown: false
        }, (err, data) => {
            if(err != null){
                console.log(err);
            } else {
                console.log(data);
            }
        });

         client.reply(m.chat, json.gpt, m);
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
