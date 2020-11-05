export default  async ({msg, userDocument}) => {
    msg.reply(userDocument._doc.money + '$');
}
