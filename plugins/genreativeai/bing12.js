const { BingApi  } = require("bing-nodejs");

exports.run = {
    usage: ['test11'],
    use: 'prompt',
    category: 'generativeai',
    async: async (m, { client, text, isPrefix, command, Func, args }) => {
        try {
            
            const bing = new BingApi({
                cookie: "1W_gDtPF9iRgMk0oVGkm9akqK4M5pqUobCPIdDDgTzzQ4iI_GgQpPfZhhbPM3hnDrhhXgwLHnQ_d3PgsUGYFShOPgfaai2P_jiHktLDRz8lO8H_VVb6E79PhJDJ3_faVIYCaeFwTck4OQBsorOcV3G5Ld6wH_myMaDjFd65DSn3Ph0ZDw4_effGr-ohUKD7VXrBUOmvoumee-YLgC8fH1ng",
            });
            await bing.createImage("cute cat").then((res) => {
                console.log(res); // string[]
            });

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                client.reply(m.chat, `Error: ${error.response.status} - ${error.response.statusText}`, m);
            } else if (error.request) {
                // The request was made but no response was received
                client.reply(m.chat, 'Error: No response received from the server', m);
            } else {
                // Something happened in setting up the request that triggered an Error
                client.reply(m.chat, `Error: ${error.message}`, m);
            }
        }
    },
    error: false,
    limit: true,
    premium: false,
    cache: true,
    verified: true,
    location: __filename
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
