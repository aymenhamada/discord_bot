export default async ({msg}) => {
    msg.reply(Math.random() >= 0.5 ? 'Oui' : 'Non');
}
