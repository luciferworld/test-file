const { dalle } = require("gpti");
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
          dalle.mini({
            prompt: "An extensive green valley stretches toward imposing mountains, adorned with meadows and a winding stream. The morning sun paints the sky with warm tones, illuminating the landscape with a serenity that invites contemplation and peace."
        }, (err, data) => {
            if(err != null){
                console.log(err);
            } else {
                console.log(data);
            }
        });
         // Fixed typo in 'sendEditMessage'
        } catch (e) {
          return client.reply(m.chat, global.status.error, m)
    }
     },
    error: false
 }