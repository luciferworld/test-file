const axios = require('axios');

exports.run = {
    usage: ['otp'],
    async: async (m, { client, args, isPrefix, command, Func }) => {
        try {
            const user = global.db.users.find(v => v.jid == m.sender);
            if (user && user.numverify) {
                return client.reply(m.chat, Func.texted('bold', `✅ Your number is already verified.`), m);
            }

            if (!args || !args[0]) {
                return client.reply(m.chat, Func.example(isPrefix, command, '+1234567890'), m);
            }

            if (!/^\+\d+$/.test(args[0])) {
                return client.reply(m.chat, Func.texted('bold', '🚩 Invalid phone number. Use format: +1234567890'), m);
            }

            const existingNumbers = global.db.users.filter(v => v.phone).map(v => v.phone);
            if (existingNumbers.includes(args[0])) {
                return client.reply(m.chat, Func.texted('bold', '🚩 Phone number already registered.'), m);
            }

            client.sendReact(m.chat, '🕒', m.key);

            // Verify phone number using NumVerify API
            const apiKey = 'PCW85-VKSK6-VPB3M-4ZMPZ';
            const phoneNumber = args[0];

            const apiUrl = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${phoneNumber}&country_code=&format=1`;

            axios.get(apiUrl)
              .then(response => {
                const { valid } = response.data;
                if (valid) {
                  user.numverify = true;
                  user.phone = phoneNumber;
                  return client.reply(m.chat, Func.texted('bold', `✅ Phone number verified successfully!`), m);
                } else {
                  return client.reply(m.chat, Func.texted('bold', `❌ Phone number verification failed. Please try again.`), m);
                }
              })
              .catch(error => {
                console.error('Error verifying phone number:', error.response.data);
                return client.reply(m.chat, Func.texted('bold', `❌ Error verifying phone number.`), m);
              });

        } catch (e) {
            console.error(e);
            client.reply(m.chat, Func.jsonFormat(e), m);
        }
    },
    __filename
};
