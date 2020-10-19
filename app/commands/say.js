import { Text2Speech } from '../service/tts.js';
import fs from "fs";

export default async ({msg, text, voiceChannel}) => {

    if (voiceChannel === null) {
        // TODO: check if the first parameter is a mention if its the case join his voice channel
        return;
    }

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
