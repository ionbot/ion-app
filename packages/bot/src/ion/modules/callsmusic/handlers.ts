import { spawn } from "child_process";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { GramTGCalls } from "gram-tgcalls";
import IonHandler from "../../core/IonHandler";

if (!existsSync("downloads")) {
  mkdirSync("downloads");
}

var gramtgcalls: GramTGCalls;

const getFFmpegArgs = (input: string) => {
  return (
    "-y -nostdin " +
    `-i ${input} ` +
    "-c copy " +
    "-acodec pcm_s16le " +
    "-f s16le " +
    "-ac 1 " +
    "-ar 65000 " +
    "pipe:1"
  ).split(/\s/g);
};

const spawnFFmpeg = (path: string) => {
  return spawn("ffmpeg", getFFmpegArgs(path));
};

export default [
  new IonHandler(
    async (client, event, config) => {
      if (!gramtgcalls) {
        gramtgcalls = new GramTGCalls(client);
      }

      const repliedMessage = await event.message.getReplyMessage();
      let audioOrVoice;

      if (repliedMessage) {
        audioOrVoice = repliedMessage.audio || repliedMessage.voice;
      }

      if (!repliedMessage || !audioOrVoice) {
        await event.message.edit({
          text: "Reply an audio file or voice message.",
        });
        return;
      }

      const path = `downloads/${audioOrVoice.id}`;

      if (!existsSync(path)) {
        const media = await client.downloadMedia(audioOrVoice, {});
        writeFileSync(path, media);
      }

      // @ts-ignore
      await gramtgcalls.stream(event.chatId, spawnFFmpeg(path).stdout);
      await repliedMessage.reply({ message: "Streaming..." });
    },
    { commands: "stream", scope: "group" }
  ),
  new IonHandler(
    async (client, event, config) => {
      if (!gramtgcalls) {
        return;
      }

      await event.message.edit({
        // @ts-ignore
        text: gramtgcalls.pause(event.chatId) ? "Paused!" : "Not streaming!",
      });
    },
    { commands: "pause", scope: "group" }
  ),
  new IonHandler(
    async (client, event, config) => {
      if (!gramtgcalls) {
        return;
      }
      await event.message.edit({
        // @ts-ignore
        text: gramtgcalls.resume(event.chatId) ? "Resumed!" : "Not paused!",
      });
    },
    { commands: "resume", scope: "group" }
  ),
];
