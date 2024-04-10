const axios = require('axios');

exports.run = {
    usage: ['terabox'],
    use: 'url',
    category: 'downloader',
    async: async (m, { client, args, isPrefix, command, Func, text }) => {
        try {
            const { TeraDood } = require('@kodingkeundev/teradood')

            var url = 'https://teraboxapp.com/s/1heSERcqw_avia6RFOIzoSg'
            TeraDood.terabox(url)
              .then(result => {
                // action here
                console.log(result) // for see details result
              })
              .catch(error => {
                // action error here
                console.error('Something went wrong', error) // for see details error
              })
        } catch (e) {
            console.error(e);
            return client.reply(m.chat, global.status.error, m);
        }
    },
    error: false,
    limit: true,
    verified: true,
    premium: false
};
