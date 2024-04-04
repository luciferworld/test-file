const  ChatBot = require("sydney-ai");
const bot = new ChatBot(`${global.bing}`);
xports.run = {
    usage: ['mygf'],
    use: 'query ',
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
         let response = await bot.ask(text);
        m.reply(response)
        } catch (e) {
      return client.reply(m.chat, global.status.error, m)
  }
},
error: false,
limit: true,
verified: true,
premium: false,
}