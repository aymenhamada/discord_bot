import {getQuestion} from '../service/question.js';

export default async ({channel}) => {
    const question = await getQuestion();
    const answersEmojis = ['🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '🟪'];

    let text = question.question.replace(/&quot;/g, '\\"').replace(/&#039;/g, '\'') + '\n';
    const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
    answers.forEach((answer, index) => {
        text += (answersEmojis[index]) + ' ' + answer + '\n';
    })
    const questionSent = await channel.send(text);

    answers.forEach((a, index) => {
        questionSent.react(answersEmojis[index]);
    })

    setTimeout(function () {
        channel.send('The answer was: ' + question.correct_answer);
    }, 15000);
}
