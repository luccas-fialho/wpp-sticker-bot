const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');
const { client } = require('./client');

const generateSticker = async (msg, sender) => {
    if (msg.type === "image") {
        try {
            const { data } = await msg.downloadMedia();
            const image = await new MessageMedia("image/jpeg", data, "image.jpg");
            msg.reply("É pra já chefe!...");
            await client.sendMessage(sender, image, { sendMediaAsSticker: true, stickerName: "🤓", stickerAuthor: "Luccky @lucky.cas" });
        } catch (e) {
            msg.reply("❌ Erro ao processar imagem");
        }
    } else if (msg.type === "video") {
        try {
            const { data } = await msg.downloadMedia();

            const video = await new MessageMedia(`${msg._data.mimetype}`, data, "video.mp4");
            msg.reply("Carregando sua obra prima...");
            await client.sendMessage(sender, video, { sendMediaAsSticker: true, stickerName: "🤓", stickerAuthor: "Luccky @lucky.cas" });
        } catch (e) {
            msg.reply("❌ Erro ao processar video");
            console.log('erro', e);
        }
    } else {
        try {
            const url = msg.body.substring(msg.body.indexOf(" ")).trim();
            const { data } = await axios.get(url, { responseType: 'arraybuffer' });
            const returnedB64 = Buffer.from(data).toString('base64');
            const image = await new MessageMedia("image/jpeg", returnedB64, "image.jpg");
            msg.reply("Calma ai....");
            await client.sendMessage(sender, image, { sendMediaAsSticker: true, stickerName: "🤓", stickerAuthor: "Luccky @lucky.cas" });
        } catch (e) {
            msg.reply("❌ Ih, deu ruim :xx");
        }
    }
};
exports.generateSticker = generateSticker;
