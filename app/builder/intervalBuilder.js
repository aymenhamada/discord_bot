import fs from "fs";
import client from '../service/client.js';

const intervals = [];

fs.readdir(`./app/intervals/`, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
        import('../intervals/' + file).then(interval => {
            intervals.push(interval);
            if (interval.default.active) {
                setInterval(() => {
                    client.guilds.cache.forEach(g => {
                        interval.default.guilds.forEach(i => {
                            if (i.id === g.id) {
                                i.channels.forEach((id) => {
                                    try {
                                        interval.default.handler(g, g.channels.resolve(id));
                                    } catch (e) {
                                        console.log(e);
                                    }
                                });
                            }
                        });
                    });
                }, interval.default.interval);
            }
        })
    });
});

export default intervals;
