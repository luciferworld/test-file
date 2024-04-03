const { G4F } = require("g4f");
const fs = require('fs');
const g4f = new G4F();

// Load conversation data from file if available
let userConversations = {};

try {
    userConversations = JSON.parse(fs.readFileSync('user_conversations.json', 'utf8'));
    console.log('User conversations loaded.');
} catch (err) {
    console.error('Error loading user conversations:', err);
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
        const userId = `${m.chat}`;

        // Initialize user conversation if not exists
        if (!userConversations[userId]) {
            userConversations[userId] = [];
        }

        // Check if the command is 'test forget'
        if (command == 'test forget') {
            // Clear the user's conversation history and remove saved file
            userConversations[userId] = [];
            fs.writeFileSync(`user_conversation_${userId}.json`, '[]', 'utf8');
            return client.reply(m.chat, 'Your conversation history has been cleared.', m);
        }

        if (!m.quoted && !text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m);
         
        client.sendReact(m.chat, '🕒', m.key);

        // If there's text, add user's message to the user's conversation array
        if (text) {
            userConversations[userId].push({ role: "user", content: `${text}` });
            // Save user's conversation data to file
            fs.writeFileSync(`user_conversation_${userId}.json`, JSON.stringify(userConversations[userId]), 'utf8');
        }

        const options = {
            provider: g4f.providers.GPT,
            model: "gpt-4",
            debug: true,
            proxy: ""
        };
        
        (async() => {
            // Use the user's conversation array as input for chatCompletion method
            const resp = await g4f.chatCompletion(userConversations[userId], options);    
            m.reply(resp); 

            // Add the AI response to the user's conversation array
            userConversations[userId].push({ role: "assistant", content: resp });
            // Save user's conversation data to file
            fs.writeFileSync(`user_conversation_${userId}.json`, JSON.stringify(userConversations[userId]), 'utf8');
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
