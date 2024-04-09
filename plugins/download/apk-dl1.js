const apk_dl = require('apk-dl.js');

exports.run = {
  usage: ['apk1'],
  use: 'query',
  category: 'downloader',
  async: async (m, { client, text, args, isPrefix, command, Func }) => {
    try {
        let data = await apk_dl.apkdl.search('minecraft')
        console.log(data)


    } catch (e) {
      console.error(e); // Log the error for debugging
      return client.reply(m.chat, global.status.error, m);
    }
  },
  error: false,
  limit: true,
  verified: true,
  premium: false
};
