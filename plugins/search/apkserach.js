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
         
          
          
        gplay.app({appId: 'com.google.android.apps.translate'})
  .then(console.log, console.log);
      } catch (e) {
          return client.reply(m.chat, global.status.error, m)
      }
  },
  error: false,
  limit: true,
  verified: true,
  premium: false
}
