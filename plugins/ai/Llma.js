const { RsnChat } = require('rsnchat');
const rsnchat = new RsnChat(process.env.RSGPT);
exports.run = {
    usage: ['llma'],
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
        if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await rsnchat.llama(text)
        client.reply(m.chat, json.message, m)
        } catch (e) {
      return client.reply(m.chat, global.status.error, m)
  }
},
error: false,
limit: true,
premium: true,
verified: true,
}
