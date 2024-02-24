const {googlePlayDownload} = require("haji-api/modules/googleplay");
exports.run = {
    usage: ['sssd'],
    use: 'reply photo',
    category: 'converter',
    async: async (m, {
       client,
       isPrefix,
       command,
       Func,
       Scraper
    }) => {
       try {
        googlePlayDownload({url: "https://play.google.com/store/apps/details?id=org.telegram.messenger"})
        .then(console.log);
       } catch (e) {
          return client.reply(m.chat, Func.jsonFormat(e), m)
       }
    },
    error: false,
    limit: true,
    cache: true,
    verified: true,
    location: __filename
 }