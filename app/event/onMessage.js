import client from '../service/client.js';
import commands from '../builder/commandBuilder.js';
import middlewares from "../builder/middlewareBuilder.js";

export default (msg) => {

    if (msg.author.id === client.user.id) return;

    if (msg.content.includes('weber') && Math.random() >= 0.8) {
        return msg.channel.send('oh non pas pas le grand vilain victor weber');
    }

    if (msg.content.length === 0 || !msg.content.startsWith('!p')) return;

    const wordtab = msg.content.split(' ');
    if (wordtab.length === 1) {
        return msg.reply("T'as oublié de mettre une commande.");
    }

    const command = commands.find((c) => {
        if (c.parent.length > 0 && c.parent.toString() === wordtab.slice(1, wordtab.length - 1).toString()) {
            return c.name === wordtab[wordtab.length - 1];
        }
        return c.name === wordtab[1]
    });

    if (command && command.handler) {
        const guild = msg.guild;
        const user = msg.member ? msg.member.user : null;
        const voiceState = user ? guild.voiceStates.resolve(user.id) : null;
        const voiceChannel = voiceState ? voiceState.channel : null;
        let data = { };

        middlewares.forEach(m => {
            if (m.default.commands.length === 0 || m.default.commands.find(i => i === command.handler.default)) {
                const avoid = m.default.avoid.find(a => a === command.handler.default);
                if (avoid === undefined) {
                    m.default.middleware(msg, (mdData) => {
                        data = {...data, ...mdData};
                        try {
                            command.handler.default({
                                msg,
                                text: msg.content.substr(3 + command.name.length, msg.content.length),
                                guild,
                                user,
                                voiceChannel,
                                channel: msg.channel,
                                ...data
                            });
                        } catch (e) {
                            console.log(`error on handler ${command.name}:`, e);
                        }
                    });
                }
            }
        });
    } else {
        console.log('handler not found', msg.content);
        // msg.member.user.send(
        //    'Commands: ' +
        //    commands.map(u => u.name).toLocaleString()
        // );
    }

}
