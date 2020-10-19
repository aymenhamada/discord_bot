import { Text2Speech } from '../service/tts.js';
import fs from "fs";

export default async ({msg, text, voiceChannel}) => {

    if (text === '') {
        return msg.reply('On dirait que tu as oublié de mettre du text gros bg');
    }

    await Text2Speech(text);

    voiceChannel.join().then((connection) => {
        connection.play('./output.mp3').on('finish', () => {
            voiceChannel.leave();
        });
    });
}
