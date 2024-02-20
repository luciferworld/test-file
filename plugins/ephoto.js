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
        await w5botapi.ephoto2("https://ephoto360.com/hieu-ung-chu-tren-nen-cat-trang-tuyet-dep-663.html", ["text"])
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
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
 