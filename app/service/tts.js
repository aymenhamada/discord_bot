import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";


const ttsClient = new textToSpeech.TextToSpeechClient({projectId: process.env.GOOGLE_PROJECT, keyFilename: `${process.env.GOOGLE_TTS_CONFIG_PATH}/key.json`});
const ttsSetting = fs.readFileSync(`${process.env.GOOGLE_TTS_CONFIG_PATH}/setting.json`);

export async function Text2Speech(text, settings = ttsSetting) {
    const parsedSettings = JSON.parse(settings);
    parsedSettings.input.text = text;
    const [response] = await ttsClient.synthesizeSpeech(parsedSettings);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(parsedSettings['outputFileName'], response.audioContent);
    return response.audioContent;
}

