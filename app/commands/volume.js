import state from '../state/state.js';
import {dispatcher} from '../service/displatcher.js';

export default ({msg, text}) => {
    if (text === '') {
        return msg.reply('le volume actuel est reglé à ' + state.volume);
    }

    if (+text >= 0 && +text <= 1) {
        state.volume = +text;
        msg.reply('volume changé à ' + state.volume);
        if (dispatcher === undefined) {
            return;
        }
        dispatcher.setVolume(state.volume);
    } else {
        msg.reply('value incorrect');
    }
}
