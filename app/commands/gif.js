import axios from 'axios';

export default async ({channel, msg, text}) => {
    if (text === '') {
        return msg.reply('ca marcherait mieux si tu mets un truc a chercher bg.');
    }

    const res = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_TOKEN}&tag=${text}&rating=g`)
    if (res.data.data.url) {
       return channel.send(res.data.data.url);
    }
    msg.reply('pas de resultats dsl');
}
