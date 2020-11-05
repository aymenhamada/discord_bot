import User from '../models/user.js';

/*
 * msg: discord's message
 * stop: function to skip the command
 */
export default {
    middleware: async (msg) => {
        let userDocument = await User.findOne({id: msg.author.id});
        if (userDocument === null) {
            userDocument = await User.create({
                username: msg.author.username,
                id: msg.author.id
            });
        }
        return {userDocument};
    },
    commands: [], // if empty, apply to all commands
    avoid: [] // exceptions
}
