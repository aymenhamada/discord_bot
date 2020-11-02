import User from '../models/user.js';

export default ({user, channel}) => {
    const u = new User({
        id: user.id,
        name: 'test'
    });
    u.save();
    channel.send('oui');
}
