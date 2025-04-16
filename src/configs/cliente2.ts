import { BotConfig } from '../types/config';

export const cliente2Config: BotConfig = {
  clientId: 'cliente2',
  menuOptions: {
    '1': 'Horarios de atención: Lunes a Viernes de 9 a 18hs.',
    '2': 'Precios desde $5000. ¡Consultá por promociones!',
    '3': 'Realizamos envíos a todo el país.',
    '4': 'Podés ver nuestro catálogo completo acá 👉 [link]',
    '5': 'Formas de pago: Efectivo, transferencia, tarjetas.',
    '6': 'Te derivo con un asesor, te responderá en breve 😊',
  },
  welcomeMessage: `Hola 👋 Bienvenido/a a [Nombre del Negocio].
  ¿En qué te puedo ayudar?
  1️⃣ Horarios
  2️⃣ Precios
  3️⃣ Envíos
  4️⃣ Ver catálogo
  5️⃣ Formas de pago
  6️⃣ Hablar con un asesor`,
  twilioConfig: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
  },
}; 