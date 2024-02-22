const { gpt } = require("gpti");

exports.run = {
   usage: ['webgpt'],
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
         
         gptweb({
            prompt: `${text}`,
            markdown: false
        }, (err, data) => {
            if(err != null){
                m.reply(err);
            } else {
                m.reply(data,gpt);
            }
        });
      } catch (e) {
         client.reply(m.chat, err, m);
      }
   },
   error: false,
   limit: true,
   cache: true,
   verified: true,
   location: __filename
};
