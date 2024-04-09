const {download} = require('aptoide-scraper')
exports.run = {
   usage: ['apkdl'],
   use: 'app id',
   category: 'downloader',
   async: async (m, { client, args, isPrefix, command, Func }) => {
       try {
           if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'your app id(com.whatsapp)'), m);

           client.sendReact(m.chat, '🕒', m.key);

           let data = await download(args[0]);
           
           
         let teks = `乂  *A P K  D O W N L O A D E R *\n\n`
         teks += '	◦  *Name* : ' + data.name + '\n'
         teks += '	◦  *Upated on*: ' + data.lastup + '\n'
         teks += '	◦  *Size* : ' + data.size + '\n'
         teks += global.footer
         client.sendFile(m.chat, data.icon, '', teks, m).then(() => {
             client.sendFile(m.chat, data.dllink, data.name + '.apk', data.name, m)
         })
       } catch (e) {
           console.error(e);
           return client.reply(m.chat, global.status.error, m);
       }
   },
   error: false,
   limit: true,
   verified: true,
   premium: false
};
