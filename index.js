const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const axios = require('axios')
const client = new Client({
    puppeteer:
    {
        headless: true,
        args:
            [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
    },
    authStrategy: new LocalAuth()
})
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
    if (command === ".sticker") generateSticker(msg, sender)
    if (command === ".refri") msg.reply("TO CHEGANDO COM OS REFRI!!! 🏃‍♂️🏃‍♀️")
});

client.initialize();

const generateSticker = async (msg, sender) => {
    if (msg.type === "image") {
        try {
            const { data } = await msg.downloadMedia()
            const image = await new MessageMedia("image/jpeg", data, "image.jpg")
            msg.reply("É pra já chefe!...")
            await client.sendMessage(sender, image, { sendMediaAsSticker: true, stickerName: "🤓", stickerAuthor: "Luccky @lucky.cas" })
        } catch (e) {
            msg.reply("❌ Erro ao processar imagem")
        }
    } else {
        try {
            const url = msg.body.substring(msg.body.indexOf(" ")).trim()
            const { data } = await axios.get(url, { responseType: 'arraybuffer' })
            const returnedB64 = Buffer.from(data).toString('base64');
            const image = await new MessageMedia("image/jpeg", returnedB64, "image.jpg")
            msg.reply("Calma ai....")
            await client.sendMessage(sender, image, { sendMediaAsSticker: true, stickerName: "🤓", stickerAuthor: "Luccky @lucky.cas" })
        } catch (e) {
            msg.reply("❌ Ih, deu ruim :xx")
        }
    }
}
