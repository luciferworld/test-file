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
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://fb.watch/7B5KBCgdO3'), m);
         if (!args[0].match(/(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/)) return client.reply(m.chat, global.status.invalid, m);

         client.sendReact(m.chat, '🕒', m.key);
         const json = await facebook.v1(`${args[0]}`);

         let hdResult = json.url && json.url[0] ? json.url[0].find(v => v.quality == 'hd') : null;
         let sdResult = json.url && json.url[0] ? json.url[0].find(v => v.quality == 'sd') : null;

         if (hdResult) {
            client.sendFile(m.chat, hdResult.hd, json.title + '.mp4', `◦ *Quality* : HD`, m);
         } else if (sdResult) {
            client.sendFile(m.chat, sdResult.sd, json.title + '.mp4', `◦ *Quality* : SD`, m);
         } else {
            return client.reply(m.chat, global.status.fail, m);
         }
      } catch (e) {
         console.log(e);
         return client.reply(m.chat, global.status.error, m);
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
};
