const qrcode = require('qrcode-terminal')
const { client } = require('./client')
const { generateSticker } = require('./generateSticker')
require('dotenv').config()

client.on('qr', qr => {
    qrcode.generate(qr, { small: true })
});

client.on('ready', () => {
    console.log('Online 😎')
});

/**
 * Aqui vem como default 'message', bora trocar para 'message_create', 
 * dessa forma nós também poderemos dar comandos e não apenas seus 
 * contatos.
 */
client.on('message_create', msg => {
    //console.log(msg);
    const command = msg.body.split(' ')[0];
    // Cola seu número onde tem o 84848484, sem o 9
    const sender = msg.from.includes(process.env.NUMBER) ? msg.to : msg.from
    if (command === ".sticker" || command === ".s") generateSticker(msg, sender)
    if (command === ".gab") msg.reply("TO CHEGANDO COM OS REFRI!!! 🏃‍♂️🏃‍♀️")
});

client.initialize();
