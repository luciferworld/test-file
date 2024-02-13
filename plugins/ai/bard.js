const { RsnChat } = require("rsnchat");
const rsnchat = new RsnChat(process.env.RSGPT);
exports.run = {
   usage: ['bard', 'bard2', 'bard3'],
   use: 'query',
   category: 'ai',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      try {
         if (command == 'bard') {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'apa itu kucing'), m)
            client.sendReact(m.chat, '🕒', m.key)
            const json = await Api.neoxr('/bard', {
               q: text
            })
            if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
            client.reply(m.chat, json.data.message, m)
         } if (command == 'bard2') {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m)
            client.sendReact(m.chat, '🕒', m.key)
            const json = await Func.fetchJson(`https://api.betabotz.eu.org/api/search/bard-ai?text=${text}&apikey=beta-Ibrahim1209`)
            client.reply(m.chat, json.message, m)
         } else if (command == 'bard3') {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m)
            client.sendReact(m.chat, '🕒', m.key)
            const json = await rsnchat.bard(text)
            client.reply(m.chat, json.message, m)
         }
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   premium: true,
   location: __filename
}
