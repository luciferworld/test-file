var gplay = require('custom-google-play-scraper');


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
         
        if (!text) {
          return client.reply(m.chat, Func.example(isPrefix, command, 'facebook'), m);
      }
          
        gplay.search({
          term: `${text}`,
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
