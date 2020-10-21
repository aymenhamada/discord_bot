import fs from "fs";

const middlewares = [];

fs.readdir(`./app/middlewares/`, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
        import('../middlewares/' + file).then(middleware => {
            middlewares.push(middleware);
        })
    });
});


export default middlewares;
