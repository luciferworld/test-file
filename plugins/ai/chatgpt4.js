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
         if (!m.quoted && !text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m);
         
         client.sendReact(m.chat, '🕒', m.key);
         
         const json = await gpt({
            messages: [
            ],
            prompt: `${text}`,
            model: "GPT-4",
            markdown: false
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
