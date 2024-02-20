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
        w5botapi.ephoto2("https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html#google_vignette", ["ibrahim"])
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
 