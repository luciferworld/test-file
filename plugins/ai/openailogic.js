exports.run = {
    usage: ['logicai'],
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
        const json = await Func.fetchJson(`https://api.betabotz.eu.org/api/search/openai-logic?text=${text}&logic=aku%20betabotz%20ai%20yang%20dibuat%20oleh%20lann%20namaku%20BetaBotz%20ai&apikey=beta-Ibrahim1209`)
        client.reply(m.chat, json.message, m)
        } catch (e) {
      return client.reply(m.chat, global.status.error, m)
  }
},
error: false,
limit: true,
premium: true,
}
