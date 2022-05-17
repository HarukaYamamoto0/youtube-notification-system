async function robot(youtube) {
  const { channels, newVideos } = youtube;
  if (!newVideos.length) return;

  for (const videoInfo of newVideos) {
    const { channelId, url } = videoInfo;

    const channel = channels.find((channel) => channel._id === channelId);
    const { servers } = channel;
    youtube.servers = [];

    for (const server of servers) {
      server.url = url;
      youtube.servers.push(server);
    }
  }
}

module.exports = robot;
