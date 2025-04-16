import express from 'express';
import dotenv from 'dotenv';
import { getBotReply } from './botLogic';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.post('/webhook', (req, res) => {
  const incomingMsg = req.body.Body;
  const from = req.body.From;

  console.log(`Mensaje recibido de ${from}:`, incomingMsg);

  const reply = getBotReply(incomingMsg);

  res.set('Content-Type', 'text/xml');
  res.send(`
    <Response>
      <Message>${reply}</Message>
    </Response>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
