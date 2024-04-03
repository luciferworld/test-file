const { G4F } = require("g4f");
const g4f = new G4F();
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
         
        const messages = [
            { userId: `${m.jid}`, role: "user", content: "Hi, what's up?"}
            // Add more messages here if needed
        ];
        const options = {
            provider: g4f.providers.GPT,
            model: "gpt-4",
            debug: true,
            proxy: ""
        };
        
        (async() => {
            const text = await g4f.chatCompletion(messages, options);    
            console.log(text); 
        })();
          
          
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
 