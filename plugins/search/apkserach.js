const gplay = require('custom-google-play-scraper');

exports.run = {
  usage: ['apksearch'],
  use: 'query',
  category: 'search',
  async: async (m, { client, text, args, isPrefix, command, Func }) => {
    try {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'Facebook'), m);
      
      client.sendReact(m.chat, '🕒', m.key);
      
       gplay.search({
        term: text,
        num: 2
      }).then((response) => {
        console.log(response);
      });
    } catch (e) {
      console.error(e); // Log the error for debugging
      return client.reply(m.chat, global.status.error, m);
    }
  },
  error: false,
  limit: true,
  verified: true,
  premium: false
};
