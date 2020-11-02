// eslint-disable-next-line no-unused-vars
import {mongoose} from './service/database.js';

import client from './service/client.js';
import {onMessage, onReady} from './event/index.js';

// eslint-disable-next-line no-unused-vars
import interval from '../app/builder/intervalBuilder.js';

client.login(process.env.DISCORD_TOKEN);
client.on('ready', onReady);
client.on('message', onMessage);


