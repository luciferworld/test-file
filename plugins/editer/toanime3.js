const {logo2} = require("haji-api/modules/image");
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
        logo2("HA")
    .then(console.log)
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