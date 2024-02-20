const { facebook } = require("@xct007/frieren-scraper");
exports.run = {
   usage: ['fb'],
   hidden: ['fbdl', 'fbvid'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      Func
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://fb.watch/7B5KBCgdO3'), m)
         if (!args[0].match(/(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/)) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = facebook.v1(args[0])
         if (json.isHdAvailable === true) {
            client.sendFile(m.chat, json.urls.hd,  json.title + 'mp4', `◦ *Quality* : HD`, m)
         } else {
            let result = json.urls
            if (!result) return client.reply(m.chat, global.status.fail, m)
            client.sendFile(m.chat,json.urls.sd, json.title + 'mp4', `◦ *Quality* : SD`, m)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}
