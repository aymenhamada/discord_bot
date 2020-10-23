import fs from "fs";

const commands = [];

fs.readdir(`./app/commands/`, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
        if(file.substr(file.length - 3) !== '.js') {
            fs.readdir(`./app/commands/${file}`, function (e, folder) {
                folder.forEach(f => {
                    import('../commands/' + file + '/' + f).then(command => {
                        commands.push({
                            name: file,
                            subCommand: f.substr(0, f.length - 3),
                            handler: command
                        });
                    })
                })
            });
        } else {
                import('../commands/' + file).then(command => {
                    commands.push({
                        name: file.substr(0, file.length - 3),
                        handler: command
                    });
                })
        }
    });
});


export default commands;
