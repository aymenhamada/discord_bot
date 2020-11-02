import User from '../models/user.js';

/*
 * msg: discord's message
 * stop: function to skip the command
 */
export default {
    middleware: async (msg, next) => {
        const user = await User.findOne({id: msg.member.id});
        if (user === undefined) {
            return;
        }
        next({userDocument: user});
    },
    commands: [], // if empty, apply to all commands
    avoid: [] // exceptions
}
