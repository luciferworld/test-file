exports.run = {
  usage: ['blackbox'],
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
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m)
      client.sendReact(m.chat, '🕒', m.key)
      const edit = await client.reply(m.chat, 'in progress......', m) // Added missing space after 'await'
      const json = await Func.fetchJson(`https://api.betabotz.eu.org/api/search/blackbox-chat?text=${text}&apikey=beta-Ibrahim1209`) // Added missing space after 'await'
      client.sendEditMessage(m.chat, json.message, {lastMessages: [edit] }, m) // Fixed typo in 'sendEditMessage'
    } catch (e) {
      return client.reply(m.chat, global.status.error, m)
    }
  },
  error: false,
  limit: true,
  verified: true,
  premium: false,
};
