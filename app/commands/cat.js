import meow from 'random-meow';

export default async ({channel}) => {
    meow().then(url => channel.send(url)).catch(console.error);
}
