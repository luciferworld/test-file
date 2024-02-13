exports.run = {
    async: async (m, {
        client,
        body,
        text,
        isOwner,
        isAdmin,
        isBotAdmin,
        participants,
        users,
        groupSet,
        setting,
        store,
        Func,
        Scraper
    }) => {
       try {
        setInterval(async () => {
            const expire = global.db.users.filter(v => new Date - v.codeExpire > 180000 && !v.verified)
            if (expire.length < 1) return
            for (let user of expire) {
               user.codeExpire = 0
               user.code = ''
               user.email = ''
               user.attempt = 0
            }
         }, 60_000)
         //Verification
         if (!m.isGroup && body && body.match(/\d{3}-\d{3}/) && !users.verified) {
            if (users.jid == m.sender && users.code != body.trim()) return client.reply(m.chat, Func.texted('bold', '🚩 Your verification code is wrong.'), m)
            if (new Date - users.codeExpire > 180000) return client.reply(m.chat, Func.texted('bold', '🚩 Your verification code has expired.'), m).then(() => {
               users.codeExpire = 0
               users.code = ''
               users.email = ''
               users.attempt = 0
            })
            return client.reply(m.chat, Func.texted('bold', `✅ Your number has been successfully verified (+50 Limit)`), m).then(() => {
               users.codeExpire = 0
               users.code = ''
               users.attempt = 0
               users.verified = true
               users.limit += 50
            })
         }
        
       } catch (e) {
          console.log(e)
          return client.reply(m.chat, Func.jsonFormat(e), m)
       }
    },
    error: false,
    group: true,
    cache: true,
    location: __filename
 }