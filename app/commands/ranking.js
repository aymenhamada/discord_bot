import state from '../state/state.js';

export default async ({channel}) => {
    channel.send('### TOP 5 ###');
    state.question.scores.slice(0, 5).forEach((score, index) => {
        channel.send('#' + (index + 1) + ': ' + score.name + ' -> ' + score.points + ' points.');
    });

}
