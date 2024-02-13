exports.run = {
   usage: ['apkdl'],
   use: 'app id ',
   category: 'downloader',
   async: async (m, { client, args, isPrefix, command, Func }) => {
       try {
           if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'your app id(com.whatsapp)'), m);

           client.sendReact(m.chat, '🕒', m.key);

           let json = await Func.fetchJson(`https://api.lolhuman.xyz/api/apkdownloader?apikey=GataDios&package=${args[0]}`);
           
           if (!json.message) return client.reply(m.chat, global.status.fail, m)
         let teks = `乂  *A P K  D O W N L O A D E R *\n\n`
         teks += '	◦  *Name* : ' + json.result.apk_name + '\n'
         teks += '	◦  *Version*: ' + json.result.apk_version + '\n'
         teks += '	◦  *Auther* : ' + json.result.apk_author + '\n'
         teks += global.footer
         client.sendFile(m.chat, json.result.apk_icon, '', teks, m).then(() => {
            client.sendFile(m.chat, json.result.apk_link, json.result.apk_name + '.apk', json.result.apk_name, m)
         })
       } catch (e) {
           console.error(e);
           return client.reply(m.chat, global.status.error, m);
       }
   },
   error: false,
   limit: true,
   premium: false
};
