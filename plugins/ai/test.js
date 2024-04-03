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
        if (!m.quoted && !text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m);
         
        client.sendReact(m.chat, '🕒', m.key);
        const messages = [
            { userId: `${m.jid}`, role: "user", content: `${text}`}
            // Add more messages here if needed
        ];
        const options = {
            provider: g4f.providers.GPT,
            model: "gpt-4",
            debug: true,
            proxy: ""
        };
        
        (async() => {
            const resp = await g4f.chatCompletion(messages, options);    
            m.reply(resp); 
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
 