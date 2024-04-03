const { G4F } = require("g4f");
const g4f = new G4F();

// Create an array to store the conversation
let conversation = [];

exports.run = {
    usage: ['test', 'test forget'],
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
        // Check if the command is 'test forget'
        if (command == 'test forget') {
            // Clear the conversation array
            conversation = [];
            return client.reply(m.chat, 'Conversation history has been cleared.', m);
        }

        if (!m.quoted && !text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m);
         
        client.sendReact(m.chat, '🕒', m.key);

        // If there's text, add user's message to the conversation array
        if (text) {
            conversation.push({ userId: `${m.jid}`, role: "user", content: `${text}` });
        }

        const options = {
            provider: g4f.providers.GPT,
            model: "gpt-4",
            debug: true,
            proxy: ""
        };
        
        (async() => {
            // Use the conversation array as input for chatCompletion method
            const resp = await g4f.chatCompletion(conversation, options);    
            m.reply(resp); 

            // Add the AI response to the conversation array
            conversation.push({ role: "assistant", content: resp });
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
