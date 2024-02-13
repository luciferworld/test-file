exports.run = {
   usage: ['xnxx'],
   hidden: ['getxnxx'],
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
         if (command == 'xnxx') {
           if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'step mom'), m)
            client.sendReact(m.chat, '🕒', m.key)
            let json = await Func.fetchJson(`https://api.cafirexos.com/api/xnxxsearch?text=${text}`)  
            if (!json.status) return client.reply(m.chat, global.status.fail, m)
            let combinedCaption = "*XNXX Search*\n\n Result From search  " + text + "\n\nTo download type /getxnxx your link\n\n";
            json.result.slice(0, 18).forEach((v, i) => {
               combinedCaption += `	◦  *Title* : ${v.title}\n`;
               combinedCaption += `	◦  *Infomration* : ${v.info}\n`;
               combinedCaption += `	◦  *Link* : ${v.link}\n\n`
            })
           m.reply(`${combinedCaption}`)
         } else if (command == 'getxnxx') {
             if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'your link'), m)
             if (!args[0].match(/(?:https?:\/\/(www\.)?(xnxx)\.(com)\S+)?$/)) return client.reply(m.chat, global.status.invalid, m)
            client.sendReact(m.chat, '🕒', m.key)
            let json = await Func.fetchJson(`https://api.cafirexos.com/api/xnxxdl?url=${args[0]}`)  
            if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
            let teks = `乂  *N S F W*\n\n`
            teks += '	◦  *Name* : ' + json.result.title + '\n'
            teks += '	◦  *Duratiom* : ' + json.result.duration + '\n'
            teks += '	◦  *Information* : ' + json.result.info + '\n'
            teks += global.footer
            client.sendFile(m.chat, json.result.image, '', teks, m).then(() => {
               client.sendFile(m.chat, json.result.files.high, '', json.result.title, m)
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
