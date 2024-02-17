const axios = require('axios');

exports.run = {
    usage: ['otp'],
    async: async (m, { client, args, isPrefix, command, Func }) => {
        try {
            if (!args || args.length < 1) {
                return client.reply(m.chat, Func.example(isPrefix, command, '+1234567890'), m);
            }

            if (!/^\+\d+$/.test(args[0])) {
                return client.reply(m.chat, Func.texted('bold', '🚩 Invalid phone number. Use format: +1234567890'), m);
            }

            const apiKey = 'PCW85-VKSK6-VPB3M-4ZMPZ'; // Replace 'your_api_key' with your actual API key
            const to = args[0];
            const from = 'Lucifer'; // Replace 'your_sender_phone_number' with your actual sender phone number
            const message = 'Hi'; // Message to be sent
            const otplength = 2; // Length of OTP
            const expiry = 5; // Expiry time in minutes

            const data = {
                to: to,
                from: from,
                message: message,
                otplength: otplength,
                expiry: expiry
            };

            const apiUrl = `https://ws.postcoder.com/pcw/${apiKey}/otp/send`;

            axios.post(apiUrl, data)
              .then(response => {
                console.log('Message sent:', response.data);
                client.reply(m.chat, 'Message sent successfully!', m);
              })
              .catch(error => {
                console.error('Error sending message:', error.response.data);
                client.reply(m.chat, Func.texted('bold', `❌ Error sending message.`), m);
              });

        } catch (e) {
            console.error(e);
            client.reply(m.chat, Func.jsonFormat(e), m);
        }
    },
    __filename
};
