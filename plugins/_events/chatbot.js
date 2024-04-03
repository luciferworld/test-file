exports.run = {
    async: async (m, { client, setting, Scraper, Func }) => {
        try {
            // Process when the message is a reply to an image or contains an image with a caption
            if ((m.quoted && m.quoted.mtype === 'imageMessage') || (m.mtype === 'imageMessage' && m.text)) {
                let q = m.quoted ? m.quoted : m;
                let mime = (q.msg || q).mimetype || '';
                if (mime.includes('image')) {
                    let img = await client.downloadMediaMessage(q.msg || q);
                    let image = await Scraper.uploadImageV2(img);

                    // Extract text from caption if available
                    let text = '';
                    if (m.text) {
                        text = encodeURIComponent(m.text);
                    } else if (q.caption) {
                        text = encodeURIComponent(q.caption);
                    }

                    // Send data to API using Func.fetchJson
                    let apiURL = `https://api.betabotz.eu.org/api/search/bard-img?url=${image.data.url}&apikey=beta-Ibrahim1209`;
                    if (text) {
                        apiURL += `&text=${text}`;
                    }
                    const data = await Func.fetchJson(apiURL);

                    // Reply with the data from the API
                    m.reply(data.result);
                } else {
                    console.error('Error: Media message not found');
                }
            }

            // Process text message
            else if (m.text) {
                // Process the text message here
                // For example, you can reply with a predefined message
                client.reply(m.chat, 'Thank you for your message!', m);
            }
        } catch (e) {
            console.error('Error:', e);
        }
    },
    error: false,
    private: true,
    cache: true,
    premium: true,
    location: __filename
};
