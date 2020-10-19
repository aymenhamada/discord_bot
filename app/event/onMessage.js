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
        command.handler.default(msg, msg.content.substr(3 + command.name.length, msg.content.length));
    } else {
        console.log('handler not found');
    }

}
