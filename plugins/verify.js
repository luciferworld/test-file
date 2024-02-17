const nodemailer = require('nodemailer');

exports.run = {
    usage: ['register'],
    async: async (m, { client, args, isPrefix, command, Func }) => {
        try {
            if (global.db.users.find(v => v.jid == m.sender).verified) return client.reply(m.chat, Func.texted('bold', `✅ Your number already verified.`), m);
            if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'alex80@gmail.com'), m);
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ig.test(args[0])) return client.reply(m.chat, Func.texted('bold', '🚩 Invalid email.'), m);
            
            let emails = global.db.users.filter(v => v.email).map(v => v.email);
            if (emails.includes(args[0])) return client.reply(m.chat, Func.texted('bold', '🚩 Email already registered.'), m);

            client.sendReact(m.chat, '🕒', m.key);
            let code = `${Func.randomInt(100, 900)}-${Func.randomInt(100, 900)}`;
            let users = global.db.users.find(v => v.jid == m.sender);
            users.codeExpire = new Date() * 1;
            users.code = code;
            users.email = args[0];

            const transport = nodemailer.createTransport({
                host: 'smtp.mailgun.org',
                port: 587,
                auth: {
                    user: 'postmaster@sandbox97b03774c5764c27b44f7db1a6085a0e.mailgun.org',
                    pass: 'd341793467024caef58d0061b59acacf-102c75d8-a59d05f3'
                }
            });

            const mailOptions = {
                from: {
                    name: process.env.USER_NAME,
                    address: process.env.USER_EMAIL
                },
                to: args[0],
                subject: 'lucifer - MD Email Verification',
                html: `<div style="width: 600px; height: 500px; margin: auto; font-family: Arial, sans-serif;">
                        <div style="line-height: 2; letter-spacing: 0.5px; position: relative; padding: 10px 20px; width: 540px; min-height: 360px; margin: auto; border: 1px solid #DDD; border-radius: 14px;">
                            <h3> Hi <b>${m.pushName} 😘</b> Welcome to Lucifer - MD an awesome Whatsapp Bot!</h3>
                            <p>Send this code to the bot or it will expire in 3 minutes.</p>
                            <center>
                                <h1>${code}</h1>
                            </center>
                            <p>Or just click on the button below:</p>
                            <a style="cursor: pointer; text-align: center; display: block; width: 160px; margin: 30px auto; padding: 10px 10px; border: 1px solid #00FFFA; border-radius: 14px; color: #FF5700; text-decoration: none; font-size: 1rem; font-weight: 500;" href="https://wa.me/${client.decodeJid(client.user.id).split`@`[0]}?text=${code}">Verify Your Account</a>
                            <p>If you have any problem, please contact via <a href="https://api.whatsapp.com/send?phone=923229931076">WhatsApp</a></p>
                            <br>
                            <br>
                            <p>Regards,<br>Ibrahim</p>
                        </div>
                    </div>`
            };

            transport.sendMail(mailOptions, function(err, data) {
                if (err) return client.reply(m.chat, Func.texted('bold', `❌ SMTP Error !!`));
                return client.reply(m.chat, Func.texted('bold', `✅ Send the verification code from to your email to bot, immediately before it expires`), m);
            });
        } catch (e) {
            client.reply(m.chat, Func.jsonFormat(e), m);
        }
    },
    __filename
};
