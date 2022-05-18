async function robot(youtube) {
  const { channels, newVideos } = youtube;
  if (!newVideos.length) return;

  for (const video of newVideos) {
    try {
      const channel = channels.get(video.channelId);
      const servers = channel.servers;

      for (const server of servers) {
        server.url = video.url;
        youtube.servers.push(server);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = robot;
