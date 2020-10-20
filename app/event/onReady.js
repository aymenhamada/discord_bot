import client from '../service/client.js';

export default () => {
    console.log(`Logged in as ${client.user.tag}!`);
}
