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
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'Facebook'), m)
      client.sendReact(m.chat, '🕒', m.key)
      let json = gplay.search({
        term: `${text}`,
        num: 2
      })
      const results = json
            const chunkSize = 18;
            for (let i = 0; i < results.length; i += chunkSize) {
                const chunk = results.slice(i, i + chunkSize);
                let combinedCaption = i === 0 ? '乂  *Y T  S E R A C H*\n\n' : ''; // Include caption only for the first chunk
                chunk.forEach((v, index) => {
                    combinedCaption += `    ◦  *Nane* : ${v.title}\n`;
                    combinedCaption += `    ◦  *AppID* : ${v.appId}\n`;
                    combinedCaption += `    ◦  *URL* : ${v.url}\n\n`;
                });
                // Send the combined caption with search results as a single message
                await m.reply(combinedCaption);
            }
    } catch (e) {
      return client.reply(m.chat, global.status.error, m)
    }
  },
  error: false,
  limit: true,
  verified: true,
  premium: false
}