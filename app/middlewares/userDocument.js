import User from '../models/user.js';

/*
 * msg: discord's message
 * stop: function to skip the command
 */
export default {
    middleware: async (msg, stop) => {
        const user = await User.findOne({id: msg.member.id});
        if (user === undefined) {
            msg.reply("I didn't find you in the database.")
            stop();
        }
        return {userDocument: user};
    },
    commands: [], // if empty, apply to all commands
    avoid: [] // exceptions
}
