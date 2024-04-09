const playstore = require("playstore-scraper");
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
         
          
          
          playstore
  .search('facebook')
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
      } catch (e) {
          return client.reply(m.chat, global.status.error, m)
      }
  },
  error: false,
  limit: true,
  verified: true,
  premium: false
}
