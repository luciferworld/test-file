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
          const xxx = await client.reply(m.chat, 'in progress......', m) // Added missing space after 'await'
          client.sendEditMessage(m.chat, {text: 'test 123', edit: xxx }) // Fixed typo in 'sendEditMessage'
        } catch (e) {
          return client.reply(m.chat, global.status.error, m)
    }
     },
    error: false
 }