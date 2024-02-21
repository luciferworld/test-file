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
      client.sendProgress(m.chat, `Test!`, m)
    }
      catch (e) {
        
        return client.reply(m.chat, global.status.error, m)
     }
    },
    error: false
 }