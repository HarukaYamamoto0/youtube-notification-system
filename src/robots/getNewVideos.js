const Channel = require("../database/Schemas/Channel");
const { getChannelVideos } = require("yt-channel-info");

async function robot(youtube, database) {
  const channels = await Channel.find();

  youtube.channels = channels;
  youtube.newVideos = [];

  for (const channel of channels) {
    try {
      const videos = await getChannelVideos({
        channelId: channel.id,
        sortBy: "newest",
      });

      if (!videos?.items?.length) return;

      const lastId = database.get(channel.id);
      const newId = videos.items[0].videoId;
      console.log(lastId, newId);

      if (!lastId) return database.set(channel.id, newId);
      else if (newId === lastId) return;
      else if (newId !== lastId) {
        database.set(channel.id, newId);

        youtube.newVideos.push({
          channelId: channel.id,
          url: `https://youtu.be/${newId}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = robot;
