const nodemailer = require('nodemailer');

exports.run = {
    usage: ['mail'],
    use: 'no | subject | message',
    category: 'owner',
    owner: true,
    async: async (m, { client, args, isPrefix, text, command, Func }) => {
        try {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'no | subject | message'), m);

            client.sendReact(m.chat, '🕒', m.key);

            const [no, subject, msg] = text.split('|').map(str => str.trim());
            if (!no || !subject || !msg) return client.reply(m.chat, Func.example(isPrefix, command, 'no | subject | message'), m);

            const numbers = no.split(',');
            const emails = [];

            for (const number of numbers) {
                const p = await client.onWhatsApp(number.trim());
                if (p.length == 0) {
                    client.reply(m.chat, Func.texted('bold', `🚩 Invalid number: ${number}`), m);
                    continue;
                }
                const jid = client.decodeJid(p[0].jid);
                const user = global.db.users.find(v => v.jid == jid);
                if (!user) {
                    client.reply(m.chat, Func.texted('bold', `🚩 User not found for number: ${number}`), m);
                    continue;
                }
                if (!user.verified) {
                    client.reply(m.chat, Func.texted('bold', `🚩 User not verified for number: ${number}`), m);
                    continue;
                }
                emails.push(user.email);
            }

            const transporter = nodemailer.createTransport({
                host: 'smtp.office365.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'verify.lucifermd@outlook.com',
                    pass: 'Ibrahim@123'
                }
            });

            const template = `
                <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif;">
                    <div style="line-height: 2; letter-spacing: 0.5px; padding: 10px; border: 1px solid #DDD; border-radius: 14px;">
                        <h3 style="margin-top: 0;">Hi <b>${m.pushName} 😘</b> Welcome to Lucifer - MD, an awesome WhatsApp Bot!</h3>
                        <br><br>${msg}<br><br>
                        If you have any problem, please contact via <span style="color: #4D96FF;"><a href="https://api.whatsapp.com/send?phone=923229931076">WhatsApp</a></span><br>
                        <span>Regards,<br>Ibrahim</span>
                    </div>
                </div>
            `;

            for (const email of emails) {
                const mailOptions = {
                    from: {
                        name: 'Lucifer - MD (WhatsApp Bot)',
                        address: 'verify.lucifermd@outlook.com'
                    },
                    to: email,
                    subject: subject,
                    html: template
                };

                transporter.sendMail(mailOptions, function(err, data) {
                    if (err) {
                        console.error(err);
                        client.reply(m.chat, Func.texted('bold', `❌ Error sending email to ${email}`), m);
                    } else {
                        console.log('Email sent:', data.response);
                        client.reply(m.chat, `✅ Successfully sent email to ${email}`, m);
                    }
                });
            }
        } catch (e) {
            console.error(e);
            client.reply(m.chat, Func.jsonFormat(e), m);
        }
    },
    __filename
};
