import Blague from 'blague.xyz';

const joker = new Blague.Client(process.env.BLAGUE_TOKEN, {
    defaultLang: "fr"
});

export default async ({channel, text}) => {
    const args = text.split(' ');
    let lang = 'fr';

    if (args.length >= 2) {
        lang = args[1];
    }
    joker.randomJoke(lang).then((joke) => {
        channel.send(joke.toDiscordSpoils());
    });
}
