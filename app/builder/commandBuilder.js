import fs from "fs";

const commands = [];

function createlinkRecursive(parent = []) {
    fs.readdir(`./app/commands/${parent.join('/')}`, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            if(file.substr(file.length - 3) !== '.js') {
                createlinkRecursive([...parent, file])
            }
            else {
                import('../commands/' + parent.join('/') + (parent.length > 0 ? '/' : '') + file).then(command => {
                    commands.push({
                        parent: file === 'index.js' && parent.length > 1 ? parent.slice(parent.length - 2, 1) : parent,
                        name: file === 'index.js' && parent.length >= 1 ? parent[parent.length - 1] : file.substr(0, file.length - 3),
                        handler: command
                    });
                })
            }
        });
    });
}

createlinkRecursive();

export default commands;
