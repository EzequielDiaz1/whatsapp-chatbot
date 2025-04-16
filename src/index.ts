import express, { Request as ExpressRequest, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { WhatsAppBot } from './botLogic';
import { andreaConfig } from './configs/andrea';
import { cliente2Config } from './configs/cliente2';
import bodyParser from 'body-parser';
import twilio from 'twilio';

dotenv.config();

// Extender la interfaz Request
interface CustomRequest extends ExpressRequest {
  clientId?: string;
  body: {
    Body: string;
    From: string;
    To: string;
  };
}

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

// Crear instancias de bots para cada cliente
const bots = new Map<string, WhatsAppBot>();
bots.set('andrea', new WhatsAppBot(andreaConfig));
bots.set('cliente2', new WhatsAppBot(cliente2Config));

// Middleware para identificar el cliente
const identifyClient = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const phoneNumber = req.body.To;
  const clientId = Array.from(bots.keys()).find(id => 
    bots.get(id)?.getTwilioConfig().phoneNumber === phoneNumber
  );

  if (!clientId) {
    res.status(400).send('Cliente no encontrado');
    return;
  }

  req.clientId = clientId;
  next();
};

app.post('/webhook', identifyClient, (req: CustomRequest, res: Response) => {
  const incomingMsg = req.body.Body;
  const from = req.body.From;
  const clientId = req.clientId;

  if (!clientId) {
    res.status(400).send('Cliente no identificado');
    return;
  }

  console.log(`Mensaje recibido de ${from} para el cliente ${clientId}:`, incomingMsg);

  const bot = bots.get(clientId);
  if (!bot) {
    res.status(400).send('Bot no encontrado');
    return;
  }

  const reply = bot.getReply(incomingMsg);

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
