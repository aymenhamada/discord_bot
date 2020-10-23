export default async function playYoutube({guild, channel}) {
    channel.send(`Guild: ${guild.name} id: ${guild.id}`);
    guild.channels.cache.forEach(c => {
        if (c.type === 'text') {
            channel.send(`channel: ${c.name} id: ${c.id} type: ${c.type}`)
        }
    });
}
