const { G4F } = require("g4f");
const fs = require('fs');
const g4f = new G4F();

// Load all user data from file if available
let allUserData = {};

try {
    allUserData = JSON.parse(fs.readFileSync('all_user_data.json', 'utf8'));
    console.log('All user data loaded.');
} catch (err) {
    console.error('Error loading all user data:', err);
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

        // Initialize user data if not exists
        if (!allUserData[userId]) {
            allUserData[userId] = { conversations: [] };
        }

        // Check if the command is 'test forget'
        if (command == 'test forget') {
            // Clear the user's conversation history
            allUserData[userId].conversations = [];
            return client.reply(m.chat, 'Your conversation history has been cleared.', m);
        }

        if (!m.quoted && !text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m);
         
        client.sendReact(m.chat, '🕒', m.key);

        // If there's text, add user's message to the user's conversation array
        if (text) {
            allUserData[userId].conversations.push({ role: "user", content: `${text}` });
        }

        const options = {
            provider: g4f.providers.GPT,
            model: "gpt-4",
            debug: true,
            proxy: ""
        };
        
        (async() => {
            // Use the user's conversation array as input for chatCompletion method
            const resp = await g4f.chatCompletion(allUserData[userId].conversations, options);    
            m.reply(resp); 

            // Add the AI response to the user's conversation array
            allUserData[userId].conversations.push({ role: "assistant", content: resp });
        })();

        // Save all user data to file
        fs.writeFileSync(`all_user_data.json`, JSON.stringify(allUserData), 'utf8');
          
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
