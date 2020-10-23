import { Text2Speech } from '../service/tts.js';
import ytdl from 'ytdl-core-discord';
import state  from '../state/state.js';
import {dispatcher, createDispatcher} from '../service/displatcher.js';

export default  async function playYoutube({msg, text, voiceChannel, guild}) {

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

    if (state.isPlayingMedia) {
        state.mediaQueue.push({msg, text, voiceChannel, guild});
        return msg.reply('Je suis deja en train de chanter gros bg, je le rajoute a ma liste tqt');
    }

    voiceChannel.join().then( async (connection) => {
        // state.isPlayingMedia = true;
        createDispatcher(connection, await ytdl(text), {type: 'opus' });
        dispatcher.on('finish', () => {
            voiceChannel.leave();
            state.isPlayingMedia = false;
            if (state.mediaQueue.length > 0) {
                playYoutube(state.mediaQueue[0]);
                state.mediaQueue.shift();
            }
        });
    });
}
