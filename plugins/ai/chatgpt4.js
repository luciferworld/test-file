const { G4F } = require("g4f");
const fs = require('fs');
const g4f = new G4F();

let conversation = [];

// Load conversation data from file if available
try {
    conversation = JSON.parse(fs.readFileSync('conversation.json', 'utf8'));
    console.log('Conversation data loaded.');
} catch (err) {
    console.error('Error loading conversation data:', err);
}

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
            // Clear the conversation array and remove saved file
            conversation = [];
            fs.unlinkSync('conversation.json');
            return client.reply(m.chat, 'Conversation history has been cleared.', m);
        }

        if (!m.quoted && !text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m);
         
        client.sendReact(m.chat, '🕒', m.key);

        // If there's text, add user's message to the conversation array
        if (text) {
            conversation.push({ userId: `${m.jid}`, role: "user", content: `${text}` });
            // Save conversation data to file
            fs.writeFileSync('conversation.json', JSON.stringify(conversation), 'utf8');
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
            // Save conversation data to file
            fs.writeFileSync('conversation.json', JSON.stringify(conversation), 'utf8');
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
