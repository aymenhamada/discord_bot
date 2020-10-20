import state from '../state/state.js';

export default ({msg}) => {
    if (!state.sleeping) {
        return msg.reply('mais je suis deja debout laisse moi tranquille');
    }
    state.sleeping = false;
    msg.reply('moi debout oui la');
}
