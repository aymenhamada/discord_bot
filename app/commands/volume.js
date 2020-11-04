import state from '../state/state.js';
import {dispatcher} from '../service/displatcher.js';

export default ({msg, text}) => {
    if (text === '') {
        return msg.reply('le volume actuel est reglé à ' + state.volume);
    }

    if (+text >= 0 && +text <= 1) {
        state.mediaVolume = +text;
        msg.reply('volume changé à ' + state.mediaVolume);
        if (dispatcher === undefined) {
            return;
        }
        dispatcher.setVolume(state.mediaVolume);
    } else {
        msg.reply('value incorrect');
    }
}
