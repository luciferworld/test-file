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
         
         const json =  gpt({
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
            prompt: `${text}`,
            model: "GPT-4",
            markdown: false
         });

         if (json && json.gpt) {
            client.reply(m.chat, json.gpt, m);
         } else {
            // Handle case where json or json.gpt is undefined
            console.error("Unexpected response from GPT API:", json);
            client.reply(m.chat, "Unexpected response from GPT API", m);
         }
      } catch (e) {
         console.error("Error in GPT API request:", e);
         client.reply(m.chat, Func.jsonFormat(e), m);
      }
   },
   error: false,
   limit: true,
   cache: true,
   verified: true,
   location: __filename
};
