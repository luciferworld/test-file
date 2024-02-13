exports.run = {
   usage: ['xvideos'],
   hidden: ['getxvideos'],
   use: 'query <𝘱𝘳𝘦𝘮𝘪𝘶𝘮>',
   category: 'porn',
   async: async (m, {
      client,
      text,
      args,
      isPrefix,
      command,
      Func
    }) => {
      try {
         if (command == 'xvideos') {
           if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'step mom'), m)
            client.sendReact(m.chat, '🕒', m.key)
            let json = await Func.fetchJson(`https://api.betabotz.eu.org/api/search/xvideos?query=${text}&apikey=beta-Ibrahim1209`)  
            if (!json.status) return client.reply(m.chat, global.status.fail, m)
            let combinedCaption = "*乂  *X V I D E O S*\n\nResult From search  " + text + "\n\nto download type /getxvideos your link\n\n";
            json.result.slice(0, 18).map(async (v, i) => {
               combinedCaption += `	◦  *Title* : ${v.title}\n`;
               combinedCaption += `	◦  *Duration* : ${v.duration}\n`;
               combinedCaption += `	◦  *Link* : ${v.url}\n\n`
            })
           m.reply(`${combinedCaption}`)
         } else if (command == 'getxvideos') {
             if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'your link'), m)
             if (!args[0].match(/(?:https?:\/\/(www\.)?(xvideos)\.(com)\S+)?$/)) return client.reply(m.chat, global.status.invalid, m)
            client.sendReact(m.chat, '🕒', m.key)
            let json = await Func.fetchJson(`https://api.betabotz.eu.org/api/download/xvideosdl?url=${args[0]}&apikey=beta-Ibrahim1209`)  
            if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
            let teks = `乂  *X V I D E O S*\n\n`
            teks += '	◦  *Name* : ' + json.result.title + '\n'
            teks += '	◦  *Views* : ' + json.result.views + '\n'
            teks += '	◦  *Keywords* : ' + json.result.keyword + '\n'
            teks += global.footer
            client.sendFile(m.chat, json.result.thumb, '', teks, m).then(() => {
               client.sendFile(m.chat, json.result.url, '', json.result.title, m)
           })
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   premium: true,
}
