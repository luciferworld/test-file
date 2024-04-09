const {download} = require('aptoide-scraper')
const gplay = require('custom-google-play-scraper');
exports.run = {
    usage: ['app'],
    use: 'Name',
    category: 'downloader',
    async: async (m, { client, args, text, isPrefix, command, Func }) => {
        try {
            if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'your app id(com.whatsapp)'), m);

            client.sendReact(m.chat, '🕒', m.key);
            const response = await gplay.search({
                term: text,
                num: 2,
                throttle: 10
              });

            let data = await download(response[0].appId);
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
