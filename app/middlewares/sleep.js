import state from '../state/state.js';
import Debout from '../commands/debout.js';

/*
 * msg: discord's message
 * stop: function to skip the command
 */
export default {
    middleware: (msg, stop) => {
        if (state.sleeping) {
            msg.reply('mais laisse moi dormir zebi');
            stop();
        }
    },
    commands: [], // if empty, apply to all commands
    avoid: [Debout] // exceptions
}
