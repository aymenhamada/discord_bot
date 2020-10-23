import state from '../state/state.js';

export let dispatcher;

export function createDispatcher(connection, input, options = {}) {
    try {
        options.volume = state.volume;
        dispatcher = connection.play(input, options);
    } catch(e) {
        console.log(e);
    }
    return dispatcher;
}


