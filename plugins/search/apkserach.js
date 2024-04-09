const gplay = require('custom-google-play-scraper');

exports.run = {
  usage: ['apksearch'],
  use: 'query',
  category: 'search',
  async: async (m, { client, text, args, isPrefix, command, Func }) => {
    try {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'Facebook'), m);
      
      client.sendReact(m.chat, '🕒', m.key);
      
      const response = await gplay.search({
        term: text,
        num: 2
      });

      let combinedCaption = '乂  *Y T  S E R A C H*\n\n';
      response.forEach((v, index) => {
        combinedCaption += `    ◦  *Name*: ${v.title}\n`;
        combinedCaption += `    ◦  *AppID*: ${v.appId}\n`;
        combinedCaption += `    ◦  *URL*: ${v.url}\n\n`;
      });

      await m.reply(combinedCaption); // Await the reply to ensure it's sent after processing

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
