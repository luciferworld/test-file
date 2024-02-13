const axios = require('axios'); // Import axios library

// Object to store search results and timestamps for each user
const userSearchResults = {};

exports.run = {
    usage: ['spotify'],
    use: 'query',
    category: 'search',
    async: async (m, { client, text, Func }) => {
        try {
            // Check if a query is provided
            if (!text) {
                return client.reply(m.chat, Func.example(m.prefix, 'ytsearch', 'kia bat ha'), m);
            }

            // Send a reaction to indicate processing
            client.sendReact(m.chat, '🕒', m.key);

            // Make a GET request using Axios
            const response = await axios.get(`https://api.lolhuman.xyz/api/spotifysearch?apikey=GataDios&query=${text}`);

            // Check if the request was successful
            if (!response.data.status) {
                return client.reply(m.chat, Func.jsonFormat(response.data), m);
            }

            // Store search results and timestamp for the user
            userSearchResults[m.sender] = {
                results: response.data.result,
                timestamp: Date.now()
            };

            // Numbering Results and Creating Section for 1 Minute
            const results = response.data.result;
            const chunkSize = 18;
            for (let i = 0; i < results.length; i += chunkSize) {
                const chunk = results.slice(i, i + chunkSize);
                let combinedCaption = i === 0 ? '乂  *S P O T I F Y  S E R A C H*\n\n' : ''; // Include caption only for the first chunk
                chunk.forEach((v, index) => {
                    const resultNumber = i / chunkSize + index + 1; // Calculate result number
                    combinedCaption += `*${resultNumber}.*\n`;
                    combinedCaption += `    ◦  *Title* : ${v.title}\n`;
                    combinedCaption += `    ◦  *Duration* : ${v.duration}\n`;
                    combinedCaption += `    ◦  *Artists* : ${v.artists}\n`;
                    combinedCaption += `    ◦  *Popularity* : ${v.popularity}\n`;
                    combinedCaption += `    ◦  *URL* : ${v.link}\n\n`;
                });

                // Send the combined caption with search results as a single message
                await m.reply(combinedCaption);
            }

            // Delete the session after one minute if no further command is issued
            setTimeout(() => {
                delete userSearchResults[m.sender];
            }, 60000); // 1 minute (60000 milliseconds)
        } catch (e) {
            console.error(e); // Log the error for debugging
            return client.reply(m.chat, global.status.error, m);
        }
    },
    error: false,
    limit: true,
    premium: false
};

// Command handler for /spotifydl
exports['/spotifydl'] = async (m, { client, text }) => {
    try {
        // Add your logic to execute the provided link here
        return client.reply(m.chat, 'Executing Spotify download...', m);
    } catch (e) {
        console.error(e); // Log the error for debugging
        return client.reply(m.chat, global.status.error, m);
    }
};

// Listen for user replies to execute /spotifydl command for the corresponding block's link
client.on('messageCreate', async (message) => {
    try {
        const { body, args } = client.parse(message);
        if (body.startsWith('/spotifydl') && args.length === 1 && ['1', '2', '3'].includes(args[0])) {
            const blockNumber = parseInt(args[0]);
            if (userSearchResults[message.sender]) {
                const { results } = userSearchResults[message.sender];
                const resultIndex = blockNumber - 1;
                if (resultIndex >= 0 && resultIndex < results.length) {
                    const link = results[resultIndex].link;
                    const command = `/spotifydl ${link}`;
                    client.emit('message', message.chat, { ...message, body: command });
                }
            }
        }
    } catch (e) {
        console.error(e); // Log the error for debugging
    }
});
