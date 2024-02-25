const { llama2 } = require("gpti");
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
          llama2({
            messages:  [
               
                {
                    "role": "user",
                    "content": "What is wwe"
                }
            ],
            system_message: "",
            temperature: 0.9,
            max_tokens: 4096,
            top_p: 0.6,
            repetition_penalty: 1.2,
            markdown: false,
            stream: false
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