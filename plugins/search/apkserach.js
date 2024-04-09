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
      let textt = '乂  *P l A Y S T O R E  S E R A C H*\n\n'
      textt += `    ◦  *Name* : ${json.title}\n`
      textt += `    ◦  *AppID* : ${json.appId}\n`
      textt += `    ◦  *Link* : ${json.url}\n`
      client.sendFile(m.chat, json.icon, '', textt, m)
    } catch (e) {
      return client.reply(m.chat, global.status.error, m)
    }
  },
  error: false,
  limit: true,
  verified: true,
  premium: false
}