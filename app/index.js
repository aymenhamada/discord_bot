import dotenv from 'dotenv';
dotenv.config();
import Discord from 'discord.js';

import {onMessage, onReady} from './event/index.js';

const client = new Discord.Client();

client.login(process.env.DISCORD_TOKEN);
client.on('ready', () => {onReady(client)});
client.on('message', onMessage);

