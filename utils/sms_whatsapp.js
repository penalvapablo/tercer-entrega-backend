import twilio from 'twilio';
import logger from './winston.js';

const accountSid = 'ACf3e9a98a2c57f44cb42f1aaebafb631a';
const authToken = '0d8f6c6a266385c687139f5516a92576';

const client = twilio(accountSid, authToken, {
  lazyLoading:true
});

export async function checkOutSms(userPhone) {
  try {
    const message = await client.messages.create({
      body: 'Tu pedido ha sido recibido y se encuentra en proceso!',
      from: '+19377198400',
      to: `+54${userPhone}`,
    });
    logger.log(message);
  } catch (error) {
    logger.log(error);
  }
}
export async function checkOutWhatsapp(order){
  try {
    const message = await client.messages.create({
      body: `nuevo pedido de ${order.userName}, ${order.userEmail}`,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+541154192392',
    });
    logger.log(message);
  } catch (error) {
    logger.log(`error al enviar whatsapp: ${error}`);
  }
}