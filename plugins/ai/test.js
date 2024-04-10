const { bing } = require("gpti");
exports.run = {
    usage: ['test'],
    use: 'prompt',
    category: 'ai',
    async: async (m, {
       client,
       text,
       isPrefix,
       command,
       Func
    }) => {
       try {
          
          
          
bing({
    messages: [
                  ],
             prompt: `Hi`,
             model: "GPT-4",
             conversation_style: "Balanced",
    markdown: false,
    stream: false,
}, (err, data) => {
    if(err != null){
        console.log(err);
    } else {
        console.log(data);
    }
});
       } catch (e) {
          client.reply(m.chat, Func.jsonFormat(e), m);
       }
    },
    error: false,
    limit: true,
    cache: true,
    verified: true,
    location: __filename
 };
 