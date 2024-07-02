const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  puppeteer: {
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ] 
  },
  authStrategy: new LocalAuth(),
  ffmpegPath: "D:/ffmpeg/bin/ffmpeg.exe",
});
exports.client = client;
