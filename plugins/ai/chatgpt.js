exports.run = {
    usage: ['chatgpt'],
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
        const json = await Func.fetchJson(`https://api.lolhuman.xyz/api/openai-turbo?apikey=GataDios&text=${text}`)
        if (!json.message) return client.reply(m.chat, Func.jsonFormat(json), m)
        client.reply(m.chat, json.result, m)
        } catch (e) {
      return client.reply(m.chat, global.status.error, m)
  }
},
error: false,
limit: true,
verified: true,
premium: false,
}
