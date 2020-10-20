import { Text2Speech } from '../service/tts.js';
import ytdl from 'ytdl-core-discord';

export default async ({msg, text, voiceChannel, guild}) => {

    if (voiceChannel === null || msg.mentions.members.size > 0) {
        const mentionId = msg.mentions.members.first().user.id;
        const voiceState = guild.voiceStates.resolve(mentionId);
        voiceChannel = voiceState ? voiceState.channel : null;
        text = text.substr(mentionId.length + 5, text.length);
     }

    if (text === '') {
        return msg.reply('On dirait que tu as oublié de mettre du text gros bg');
    }


    await Text2Speech(text);

    voiceChannel.join().then( async (connection) => {
        connection.play(await ytdl(text), { type: 'opus' }).on('finish', () => {
            voiceChannel.leave();
        });
    });
}
