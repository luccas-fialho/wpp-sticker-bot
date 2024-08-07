//npm install github:pedroslopez/whatsapp-web.js#webpack-exodus

const qrcode = require("qrcode-terminal");
const { client } = require("./client");
const { generateSticker } = require("./generateSticker");
require("dotenv").config();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Online 😎");
});

/**
 * Aqui vem como default 'message', bora trocar para 'message_create',
 * dessa forma nós também poderemos dar comandos e não apenas seus
 * contatos.
 */
client.on("message_create", (msg) => {
  //console.log(msg);
  const command = msg.body.split(" ")[0];
  // Cola seu número onde tem o 84848484, sem o 9
  const sender = msg.from.includes(process.env.NUMBER) ? msg.to : msg.from;
  if (command === ".sticker" || command === ".s") generateSticker(msg, sender);
  if (command === ".gab") msg.reply("TO CHEGANDO COM OS REFRI!!! 🏃‍♂️🏃‍♀️");
  if (msg.body.startsWith('.soma')) {
    try {
        // Remover o prefixo '.soma' e dividir a string em números separados por novas linhas
        const numbers = msg.body.slice(6).split('\n').map(num => parseFloat(num.replace(',', '.').trim()));
        const sum = numbers.reduce((acc, curr) => acc + curr, 0);
        msg.reply(`A soma é: R$${sum}`);
    } catch (error) {
        console.error('Error processing .soma command:', error);
        msg.reply('Houve um erro ao processar sua solicitação. Por favor, verifique o formato dos números e tente novamente.');
    }
}
});

client.initialize();
