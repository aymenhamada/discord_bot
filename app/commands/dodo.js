import state from '../state/state.js';

export default async ({channel}) => {
    if (state.sleeping) {
        return;
    }
    channel.send('moi pedrito je vais dormir, aurevoir');
    state.sleeping = true;
}
