import { Text2Speech } from '../service/tts.js';
import ytdl from 'ytdl-core-discord';
import state  from '../state/state.js';

export default async function playYoutube({guild, channel}) {
    channel.send(`Guild: ${guild.name} id: ${guild.id}`);
    guild.channels.cache.forEach(c => {
        if (c.type === 'text') {
            channel.send(`channel: ${c.name} id: ${c.id} type: ${c.type}`)
        }
    });
}
