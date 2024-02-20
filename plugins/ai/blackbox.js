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
      const processingMessage = await client.reply(m.chat, "Processing your request..."); // Send placeholder message
      const json = await Func.fetchJson(`https://api.betabotz.eu.org/api/search/blackbox-chat?text=${text}&apikey=beta-Ibrahim1209`);
      await client.editMessage(m.chat, processingMessage.key.id, json.message); // Edit placeholder message with result
      } catch (e) {
        console.error(e);
        return client.reply(m.chat, global.status.error, m);
      }
  },
  error: false,
  limit: true,
  verified: true,
  premium: false,
}
