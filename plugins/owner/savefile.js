exports.run = {
    usage: ['safeplugin'],
    hidden: ['savefile'],
    use: 'reply code',
    category: 'owner',
    async: async (m, {
        client,
        Func,
        Scraper
    }) => {
        try {

            if (!text) return client.reply(m.chat, `where is the path?\n\nexample:\n${prefix + command} plugins/menu.js`, m)
            if (!m.quoted.text) return client.reply(m.chat, `reply code`, m)
            let path = `${text}`
            await require('fs').writeFileSync(path, m.quoted.text)
            await client.reply(m.chat, `Succes save file to ${path}`, m)
        } catch (error) {
            console.log(error)
            m.reply("FILED / EROR PLEASE CHECK YOUR CODE")
        }
    },
    owner: true,
    cache: true,
    location: __filename
}