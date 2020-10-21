FROM node:latest
WORKDIR /usr/src/app/
COPY . .
RUN npm install
RUN npm install ffmpeg-static
RUN npm install @discordjs/opus
RUN npm install opusscript
CMD [ "npm", "run", "start" ]
