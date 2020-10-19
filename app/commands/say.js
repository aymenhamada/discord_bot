import { Text2Speech } from '../service/tts.js';
import fs from "fs";

export default async (msg, command) => {

    if (command === '') {
        return msg.reply('On dirait que tu as oublié de mettre du texte gros bg');
    }

    const guild = msg.guild;
    const user = msg.member.user;
    const voiceChannel = guild.voiceStates.resolve(user.id).channel;

    await Text2Speech(command);

    voiceChannel.join().then(async (connection) => {
        connection.play('./output.mp3').on('finish', () => {
            voiceChannel.leave();
        }).on('errorr', (e) => {
            console.log(e);
        })
    });
}
