import User from '../../models/user.js';

export default async ({channel}) => {
    channel.send('### TOP 5 ###');
    const users = await User.find().sort({money: -1}).limit(5);
    users.forEach((user, index) => {
        if (user !== undefined)
            channel.send('#' + (index + 1) + ': ' + user.username + ' -> ' + user.money + '$.');
    });

}
