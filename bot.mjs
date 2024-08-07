import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

app.post('/webhook', async (req, res) => {
  const update = req.body;

  if (update.message && update.message.text) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    if (text === '/start') {
      await sendMessage(chatId, 'Welcome to the bot!');
    } else if (text === 'hello') {
      await sendMessage(chatId, 'Hello, how can I help you?');
    }
  }

  res.sendStatus(200);
});

async function sendMessage(chatId, text) {
  await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
