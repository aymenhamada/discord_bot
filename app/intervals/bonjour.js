export default {
    active: false,
    interval: 1000 * 10, // 10 seconds
    guilds: [
        {id: '767081989920522250', channels: ['767081989920522254']}, // serveur barroso
        // {id: '742440123383414825', channels: ['767735685968691201']} // serveur weber
    ],
    handler: (guild, channel) => {
        channel.send('bonjour');
    }
}
