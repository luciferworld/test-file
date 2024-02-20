const w5botapi = require('w5-textmaker');
exports.run = {
    usage: ['test'],
    use: 'text',
    category: 'logo maker',
    async: async (m, {
       client,
       text,
       isPrefix,
       command,
       Func
    }) => {
       try {
        if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'lucifer'), m)
       const json = await w5botapi.ephoto2("https://ephoto360.com/hieu-ung-chu-tren-nen-cat-trang-tuyet-dep-663.html", [`${text}`])
       if (!json.status) return client.reply(m.chat, global.status.fail, m)
       client.sendFile(m.chat, json.image, ``, `🍟 *Process* : ${((new Date - old) * 1)} ms`, m)
       } catch (e) {
          console.log(e)
          return client.reply(m.chat, Func.jsonFormat(e), m)
       }
    },
    error: false,
    limit: true,
    verified: true,
    restrict: true
 }
 