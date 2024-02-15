exports.run = {
    usage: ['bing3'],
    use: 'query',
    category: 'generativeai',
    async async (m, {
        client,
        text,
        args,
        isPrefix,
        command,
        Func
    }) {
        try {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'girl'), m)
            
            client.sendReact(m.chat, '🕒', m.key);
            
            // Dynamically import the ES module
            const bimgNew = await import('bimg-new');
            
            // Call generateImagesLinks function
            const imageLinks = await bimgNew.generateImagesLinks(text);
            
            console.log("Image Links:", imageLinks); // Log the response data
            
            m.reply(imageLinks);
        } catch (e) {
            console.error("Error:", e); // Log the specific error
            
            return client.reply(m.chat, global.status.error, m);
        }
    },
    error: false,
    limit: true,
    premium: false,
};
