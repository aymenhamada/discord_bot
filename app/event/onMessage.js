import fs from "fs";

const commands = [];

fs.readdir(`./app/commands/`, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
        import('../commands/' + file).then(command => {
            commands.push({
                name: file.substr(0, file.length - 3),
                handler: command
            });
        })
    });
});

export default (msg) => {

    if (msg.content.length === 0 || !msg.content.startsWith('!p')) return;

    const wordtab = msg.content.split(' ');
    if (wordtab.length === 1) {
        return msg.reply("T'as oublié de mettre une commande.");
    }

    const command = commands.find((c) => c.name === wordtab[1]);
    if (command && command.handler) {
        const guild = msg.guild;
        const user = msg.member.user;
        const voiceState = guild.voiceStates.resolve(user.id)
        const voiceChannel = voiceState ? voiceState.channel : null;

        command.handler.default({
            msg,
            text: msg.content.substr(3 + command.name.length, msg.content.length),
            guild,
            user,
            voiceChannel,
            channel: msg.channel
        });
    } else {
        console.log('handler not found');
    }

}
