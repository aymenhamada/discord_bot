import {dispatcher} from "../service/displatcher.js";

export default async ({channel, text}) => {

    switch (text) {
        case 'pause': {
            dispatcher.pause();
            break;
        }
        case 'resume': {
            dispatcher.resume();
            break;
        }
    }

}
