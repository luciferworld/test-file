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

            // Numbering Blocks and Creating Section for 1 Minute
            const results = response.data.result;
            const chunkSize = 18;
            for (let i = 0; i < results.length; i += chunkSize) {
                const chunk = results.slice(i, i + chunkSize);
                let combinedCaption = i === 0 ? '乂  *S P O T I F Y  S E R A C H*\n\n' : ''; // Include caption only for the first chunk
                chunk.forEach((v, index) => {
                    const blockNumber = i / chunkSize + 1; // Calculate block number
                    combinedCaption += `*Block ${blockNumber}*\n`;
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
        const [blockNumber, link] = text.split(' '); // Extract block number and link from command
        if (!blockNumber || !link) {
            return client.reply(m.chat, 'Invalid command format. Usage: /spotifydl [block number] [link]', m);
        }

        // Check if search results and timestamp exist for the user
        if (userSearchResults[m.sender]) {
            const { results, timestamp } = userSearchResults[m.sender];
            const currentTimestamp = Date.now();
            const elapsedTime = currentTimestamp - timestamp;
            const blockIndex = parseInt(blockNumber) - 1;

            // Check if the current time is within one minute of when the search results were sent
            if (elapsedTime <= 60000) {
                // Check if the block number is valid
                if (blockIndex >= 0 && blockIndex < results.length) {
                    // Execute the provided link for the specified block
                    // Implement your logic to execute the link here
                } else {
                    return client.reply(m.chat, 'Invalid block number.', m);
                }
            } else {
                delete userSearchResults[m.sender];
                return client.reply(m.chat, 'The session has expired. Please perform a new search.', m);
            }
        } else {
            return client.reply(m.chat, 'No recent search results found.', m);
        }
    } catch (e) {
        console.error(e); // Log the error for debugging
        return client.reply(m.chat, global.status.error, m);
    }
};
