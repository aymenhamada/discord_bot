import commands from '../builder/commandBuilder.js';

export default async ({channel}) => {
    commands.forEach(cmd => {
        console.log(cmd);
    })
}
