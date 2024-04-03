const { RsnChat } = require("rsnchat");
const rsnchat = new RsnChat(process.env.RSGPT);
exports.run = {
  usage: ['bing', 'bing2'],
  use: 'query',
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
      if (command == 'bing') {
        if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m)
        client.sendReact(m.chat, '🕒', m.key)
        const json = await rsnchat.bing(text)
        client.reply(m.chat, json.message, m)
     } else if (command == 'bing2') {
        if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'apa itu kucing'), m)
        client.sendReact(m.chat, '🕒', m.key)
        const json = await Api.neoxr('/bing-chat', {
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
  premium: false,
}

