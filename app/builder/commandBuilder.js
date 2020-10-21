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


export default commands;
