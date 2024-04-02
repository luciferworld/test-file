const { bing } = require("nayan-bing-api");
const request = require('request')
exports.run = {
    usage: ['test'],
    use: 'query',
    category: 'generativeai',
    async: async (m, {
        client,
        text,
        args,
        isPrefix,
        command,
        Func
    }) => {
        const key = "Nayan" //dont change key

        const cookie = "1LzFVXziZDqg4-9tN3GFR3HSny2O_goiWubhYH3rhrcmx2weTaqPmTSSCf2csToVE2wgUgGMSgyJcV3ZYV42CnmXcHORIrME6Sd7G6rHlhF2guecQsXzMTxlhM8X_Iy9QrpjPaZKeBHKZ_nGugUJu3Re4G0oS1YDi3RZfsgdnD6nWcsivy5-nTFFiS0mRc8QK1Ff8upKRS0yzuyXQfgkYmQ" //past your bing cookie here
        
        const prompt = "cat" // write a promt
        
        bing(prompt, cookie, key).then(data => {
          console.log(data)
        });
    },
    error: false,
    limit: true,
    premium: false,
    verified: true,
}

