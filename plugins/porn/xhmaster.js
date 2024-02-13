exports.run = {
    usage: ['xhmaster'],
    hidden: ['getxhmaster'],
    use: 'query <𝘱𝘳𝘦𝘮𝘪𝘶𝘮>',
    category: 'porn',
    async: async (m, { client, text, isPrefix, command, Func }) => {
        try {
            if (command == 'xhmaster') {
                if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'step mom'), m);

                client.sendReact(m.chat, '🕒', m.key);

                let json = await Func.fetchJson(`https://lust.scathach.id/xhamster/search?key=${text}`);
                if (!json.success) return client.reply(m.chat, global.status.fail, m);

                // Split JSON data into chunks of 18 results each
                const data = json.data;
                const chunks = [];
                for (let i = 0; i < data.length; i += 18) {
                    chunks.push(data.slice(i, i + 18));
                }

                // Send each chunk of results as a separate message
                let isFirstChunk = true;
                for (const chunk of chunks) {
                    let combinedCaption = isFirstChunk ? `*X H M A S T E R  S E A R C H*\n\n Result From search  ${text}\n\nTo download type /getxhmaster your link\n\n` : '';
                    isFirstChunk = false;
                    chunk.forEach((v, i) => {
                        combinedCaption += `    ◦  *Title* : ${v.title}\n`;
                        combinedCaption += `    ◦  *Link* : ${v.link}\n\n`;
                    });
                    await m.reply(combinedCaption);
                }
            } else if (command == 'getxhmaster') {
                if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'your link'), m)
                if (!args[0].match(/(?:https?:\/\/(www\.)?(xhamster)\.(com)\S+)?$/)) return client.reply(m.chat, global.status.invalid, m)
                client.sendReact(m.chat, '🕒', m.key)
                let json = await Func.fetchJson(`https://api.lolhuman.xyz/api/xhamster?apikey=Ibrahim112&url=${args[0]}`)
                if (!json.message) return client.reply(m.chat, Func.jsonFormat(json), m)
                let teks = `乂  *X H M A S T E R  D O W N L O A D*\n\n`
                teks += '    ◦  *Name* : ' + json.result.title + '\n'
                teks += '    ◦  *Auther* : ' + json.result.author + '\n'
                teks += '    ◦  *Duratiom* : ' + json.result.duration + '\n'
                teks += '    ◦  *Uploaded* : ' + json.result.upload + '\n'
                teks += '    ◦  *Views* : ' + json.result.views + '\n'
                teks += '    ◦  *Likes* : ' + json.result.likes + '\n'
                teks += '    ◦  *Dislikes* : ' + json.result.dislikes + '\n'
                teks += '    ◦  *Comments* : ' + json.result.comments + '\n'
                teks += '    ◦  *Rating* : ' + json.result.rating + '\n'
                
                // Check for available video qualities
                let quality = json.result.files['720p'] ? '720p' : json.result.files['480p'] ? '480p' : 'closest';
                let downloadLink = json.result.files[quality];
                teks += `    ◦  *Download Quality* : ${quality}\n`;
                teks += global.footer;

                client.sendFile(m.chat, json.result.thumbnail, '', teks, m).then(() => {
                    client.sendFile(m.chat, downloadLink, 'video.mp4', json.result.title, m)
                })
            }
        }
        catch (e) {
            console.log(e);
            return client.reply(m.chat, global.status.error, m);
        }
    },
    error: false,
    limit: true,
    hidden: true
};
