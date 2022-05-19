const robots = {
  getChannelInfo: require("./robots/getChannelInfo.js"),
  getNewVideos: require("./robots/getNewVideos.js"),
  setUrls: require("./robots/setUrls.js"),
  postman: require("./robots/postman.js"),
};

const youtube = {
  channels: new Map(),
  servers: [],
  newVideos: [],
};

async function start() {
  try {
    await robots.getChannelInfo(youtube);
    await robots.getNewVideos(youtube);
    await robots.setUrls(youtube);
    await robots.postman(youtube);

    youtube.servers = [];
    youtube.newVideos = [];

    setTimeout(start, 60000);
  } catch (err) {
    console.error(err);
  }
}

module.exports = start;
