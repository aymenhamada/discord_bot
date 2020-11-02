import {getQuestion} from '../../service/question.js';
import state from '../../state/state.js';
import User from '../../models/user.js';

export default async ({channel}) => {
    const question = await getQuestion();
    const answersEmojis = ['🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '🟪'];


    let text = question.question.replace(/&quot;/g, '\\"').replace(/&#039;/g, '\'') + '\n';
    const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
    answers.forEach((answer, index) => {
        text += (answersEmojis[index]) + ' ' + answer + '\n';
    })
    const questionSent = await channel.send(text);
    let correct = -1;

    answers.forEach((a, index) => {
        if (a === question.correct_answer) {
            correct = index
        }
        questionSent.react(answersEmojis[index]);
    })

    setTimeout(async function () {
        const result = await questionSent.reactions.resolve(answersEmojis[correct]);
        channel.send('The answer was: ' + question.correct_answer + ' ' + answersEmojis[correct]);
        const winners = [];

        result.users.cache.filter(u => u.username !== 'Pedrito').forEach((u) => {
            winners.push(u);
        })

        if (winners.length > 0) {
            let text = 'Winners: ';
            for (const u of winners) {
                text += u.username + ' ';
                await User.updateOne({id: u.id}, {
                    username: u.username,
                    $inc: { questionPoints: 1 }
                }, {upsert: true, setDefaultsOnInsert: true});
            }

            channel.send(text);
        }

    }, 15000);
}
