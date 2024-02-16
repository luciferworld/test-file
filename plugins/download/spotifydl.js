exports.run = {
    usage: ['spotifydl'],
    use: 'url',
    category: 'downloader',
    async: async (m, { client, args, isPrefix, command, Func }) => {
        try {
            if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'song url'), m);
 
            client.sendReact(m.chat, '🕒', m.key);
 
            let json = await Func.fetchJson(`https://api.betabotz.eu.org/api/download/spotify?url=${args[0]}&apikey=beta-Ibrahim1209`);
            
            if (!json.status) return client.reply(m.chat, global.status.fail, m)
          let teks = `乂  *S P O T I F Y  D O W N L O A D E R *\n\n`
          teks += '	◦  *Name* : ' + json.result.data.title + '\n'
          teks += '	◦  *Duration*: ' + json.result.data.duration + '\n'
          teks += '	◦  *Artists* : ' + json.result.data.artist.name + '\n'
          teks += global.footer
          client.sendFile(m.chat, json.result.data.thumbnail, '', teks, m).then(() => {
             client.sendFile(m.chat, json.result.data.url, json.result.data.title+ '.mp3', json.result.data.title, m)
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
 