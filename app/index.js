import dotenv from 'dotenv';
dotenv.config();
import client from './service/client.js';
import {onMessage, onReady} from './event/index.js';


client.login(process.env.DISCORD_TOKEN);
client.on('ready', onReady);
client.on('message', onMessage);


