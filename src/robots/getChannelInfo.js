const Channel = require("../database/Schemas/Channel");
const { getChannelVideos } = require("yt-channel-info");

async function robot(youtube) {
  const channels = await Channel.find({});

  for (const channel of channels) {
    try {
      const channelId = channel._id;

      const videos = await getChannelVideos({
        channelId: channelId,
        sortBy: "newest",
      });

      const channelMap = youtube.channels.get(channelId);

      // create or update
      youtube.channels.set(channelId, {
        id: channelId,
        servers: [...channel.servers],
        videos: videos.items || [],
        lastVideoId: channel.lastVideoId,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = robot;
