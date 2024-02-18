const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Access API key from environment variable
});

exports.run = {
  usage: ['chatgpt'],
  use: 'query',
  category: 'ai',
  async: async (m, {
    client,
    text,
    args,
    isPrefix,
    command,
    Func
  }) => {
    try {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'what is java script'), m)
      client.sendReact(m.chat, '🕒', m.key)

      const chatCompletion = await openai.chat.create({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: text
        }],
      });

      client.reply(m.chat, chatCompletion.data.messages[0].content, m);
    } catch (e) {
      console.error('Error:', e);
      return client.reply(m.chat, global.status.error, m);
    }
  },
  error: false,
  limit: true,
  verified: true,
  premium: true,
};
