const Channel = require("../database/Schemas/Channel");

async function robot(youtube, database) {
  youtube.channels.forEach(async (channel) => {
    try {
      const { id, videos, lastVideoId } = channel;
      if (!videos.length) return;

      const videoId = videos[0].videoId;
      if (videoId === lastVideoId) return;

      youtube.newVideos.push({
        channelId: channel.id,
        url: `https://youtu.be/${videoId}`,
      });

      await Channel.findByIdAndUpdate(id, { lastVideoId: videoId });
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = robot;
