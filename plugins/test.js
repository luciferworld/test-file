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
          const edit = await client.reply(m.chat, 'in progress......', m) // Added missing space after 'await'
          const respomse = 'test 123'
          client.sendEditMessage(m.chat, respomse, m) // Fixed typo in 'sendEditMessage'
        } catch (e) {
          return client.reply(m.chat, global.status.error, m)
    }
     },
    error: false
 }