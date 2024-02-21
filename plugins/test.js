exports.run = {
    usage: ['test'],
    category: 'beta',
    async: async (m, {
        client,
        args,
        isPrefix,
        command,
        Func,
        text
    }) => {
        try {
      client.sendMessageModify(m.chat, `Test!`, m, {
        title: '© neoxr-bot',
        largeThumb: true,
        ads: false,
        /* can buffer or url */
        thumbnail: 'https://iili.io/HP3ODj2.jpg',
        link: 'https://chat.whatsapp.com/HYknAquOTrECm9KPJJQO1V'
     })
    }
      catch (e) {
        
        return client.reply(m.chat, global.status.error, m)
     }
    },
    error: false
 }