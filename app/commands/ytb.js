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

    if (state.isPlayingMedia) {
        //state.mediaQueue.push({msg, text, voiceChannel, guild});
        dispatcher.stop();
    }

    voiceChannel.join().then( async (connection) => {
        state.isPlayingMedia = true;
        const url = text.trim();
        createDispatcher(connection, await ytdl(url), {type: 'opus' });
        dispatcher.on('finish', () => {
            voiceChannel.leave();
            state.isPlayingMedia = false;
            if (state.mediaQueue.length > 0) {
                // playYoutube(state.mediaQueue[0]);
                //state.mediaQueue.shift();
            }
        });
    });
}
