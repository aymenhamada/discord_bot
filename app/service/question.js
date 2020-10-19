import axios from 'axios';

export async function getQuestion() {
    const res = await axios.get('https://opentdb.com/api.php?amount=1');
    const question = res.data.results[0];
    return question;
}
