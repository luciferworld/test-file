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
            let json = await Func.fetchJson(`https://api.akuari.my.id/search/playstoresearch?query=${text}`)  
            let textt = "乂  *APK Search*\n\nResult From search  " + text + "\n\nTo download type /apkdl your app id\n\n";
            json.hasil.slice(0, 2).map(async (v, i) => {

           textt += `	◦  *Name* : ${v.title}\n	◦  *App Id* : ${
          v.appId
        }\n	◦  *Developer* : ${
          v.developer
        }\n	◦  *Link* : ${
          v.url
        }\n\n`;
            })
           client.sendFile(m.chat, json.hasil[0].icon, '', textt, m)
       } catch (e) {
      return client.reply(m.chat, global.status.error, m)
  }
  },
error: false,
limit: true,
premium: false,
}