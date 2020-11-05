import Discord from 'discord.js';
import Slot from 'slot-machine';
import Moment from 'moment'

export default async ({msg, channel, userDocument}) => {

    if (userDocument.slotReset > Moment()) {
        return msg.reply('tu dois encore attendre ' + ((userDocument.slotReset - Moment()) / 60 / 1000).toFixed() + ' minutes');
    }

    const cherry = new Slot.SlotSymbol('cherry', {
        display: '🍒',
        points: 20,
        weight: 100
    });

    const money = new Slot.SlotSymbol('money', {
        display: '💰',
        points: 100,
        weight: 50
    });

    const wild = new Slot.SlotSymbol('wild', {
        display: '❔',
        points: 10,
        weight: 50,
    });

    const machine = new Slot.SlotMachine(9, [cherry, money, wild]);
    let results = machine.play();

    let tick = 0;
    let lines = results.lines.map(line => line.symbols.slice(0,3));
    let print = lines.slice(tick, tick + 3);
    const msgToSend = await channel.send('0$', new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Slot Machine')
        .addField('Result', print, true));

    const turn = setInterval(async () => {
        const current = lines.slice(tick, tick + 3);
        let print = current.map(line => line.map(l => l.display)).join('\n')
        msgToSend.edit('0$', new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Slot Machine')
            .addField('Result', print, true));
        tick++;
        if (tick === 5) {
            clearInterval(turn);
            const points =  current.reduce((total, line) => line.reduce((t, l) => t + l.points, 0) + total, 0)
            await msgToSend.edit(points + ' $');
            userDocument.money += points;
            userDocument.slotReset = Moment().add(1, 'hour');
            await userDocument.save();
        }

    }, 1000);
}
