const nodemailer = require('nodemailer')
exports.run = {
   usage: ['mail'],
   use: 'no | subject | message',
   category: 'owner',
   owner: true,
    async: async (m, {
   client,
   args,
   isPrefix,
   text,
   command,
   Func
}) => {
    try {
        if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'no | subject | message'), m)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        client.sendReact(m.chat, '🕒', m.key)
        let [no, subject, msg] = text.split`|`
        if (!no || !subject || !msg) return client.reply(m.chat, Func.example(isPrefix, command, 'no | subject | message'), m)
        let p = await client.onWhatsApp(no.trim())
        if (p.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 Invalid number.`), m)
        let jid = client.decodeJid(p[0].jid)
        const users = global.db.users.find(v => v.jid == jid)
        if (!users) return client.reply(m.chat, Func.texted('bold', `🚩 User not found.`), m)
        if (!users.verified) return client.reply(m.chat, Func.texted('bold', `🚩 This user has not verified.`), m)
        const transport = nodemailer.createTransport({
           service: 'gmail',
           auth: {
              user: process.env.USER_EMAIL,
              pass: process.env.USER_APP_PASSWORD
           }
        })
        var template = `<div style="max-width: 600px; margin: auto; padding: 20px;">
        <div style="line-height: 2; letter-spacing: 0.5px; padding: 10px; border: 1px solid #DDD; border-radius: 14px;">
            <h3 style="margin-top: 0;">Hi <b>${m.pushName} 😘</b> Welcome to Lucifer - MD an awesome Whatsapp Bot!</h3>
            <br><br>${msg.trim()}<br><br>
            If you have any problem, please contact via <span style="color: #4D96FF;"><a href="https://api.whatsapp.com/send?phone=923229931076">WhatsApp</a></span><br>
            <span>Regards,<br>Ibrahim</span>
        </div>
    </div>`
        if (!mime) {
           const mailOptions = {
              from: {
                 name: 'Lucifer - MD  (WHATSAPP BOT)',
                 address: process.env.USER_EMAIL
              },
              to: users.email,
              subject: subject.trim(),
              html: template
           }
           transport.sendMail(mailOptions, function(err, data) {
              if (err) return m.reply(Func.jsonFormat(err))
              client.reply(m.chat, `✅ Successfully sent email`, m)
           })
        } else {
           let json = await Func.getFile(await q.download())
           const mailOptions = {
              from: {
                 name: process.env.USER_NAME,
                 address: process.env.USER_EMAIL
              },
              to: users.email,
              subject: subject.trim(),
              html: template,
              attachments: [{
                 filename: json.filename,
                 content: fs.createReadStream(json.file)
              }]
           }
           transport.sendMail(mailOptions, function(err, data) {
              if (err) return m.reply(Func.jsonFormat(err))
              client.reply(m.chat, `✅ Successfully sent email`, m)
           })
        }
     } catch (e) {
        client.reply(m.chat, Func.jsonFormat(e), m)
     }
  }, 
 __filename
}