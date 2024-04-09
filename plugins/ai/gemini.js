const { RsnChat } = require("rsnchat");
const rsnchat = new RsnChat(process.env.RSGPT);
exports.run = {
    usage: ['gemini', 'gemini2'],
    use: 'query <𝘱𝘳𝘦𝘮𝘪𝘶𝘮>',
    category: 'ai',
    async: async (m, {
      client,
      text,
      args,
      isPrefix,
      command,
      Func
    }) => {
       try {
        if (command == 'gemini') {
        if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await rsnchat.gemini(text)
        client.reply(m.chat, json.message, m)
        } else if (command == 'gemini2') {
          if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'apa itu kucing'), m)
          client.sendReact(m.chat, '🕒', m.key)
          const json = await Api.neoxr('/gemini-chat', {
             q: text
          })
          if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
          client.reply(m.chat, json.data.message, m)
        }
        } catch (e) {
      return client.reply(m.chat, global.status.error, m)
  }
},
error: false,
limit: true,
verified: true,
premium: true,
}
