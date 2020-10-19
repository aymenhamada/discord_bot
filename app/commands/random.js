export default async ({msg, text, voiceChannel}) => {
    msg.reply(Math.random() >= 0.5 ? 'Oui' : 'Non');
}
