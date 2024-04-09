exports.run = {
  usage: ['apksearch'],
  use: 'query',
  category: 'search',
  async: async (m, {
      client,
      text,
      args,
      isPrefix,
      command,
      Func
  }) => {
      try {
          const gplay = await import('google-play-scraper');
          
          if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'Facebook'), m)
          client.sendReact(m.chat, '🕒', m.key)
          gplay.search({
              term: text,
              num: 2
          }).then(console.log, console.log);
      } catch (e) {
          return client.reply(m.chat, global.status.error, m)
      }
  },
  error: false,
  limit: true,
  verified: true,
  premium: false
}
