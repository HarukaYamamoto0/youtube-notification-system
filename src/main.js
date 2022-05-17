const { Database } = require("appo-database");
const database = new Database();

const robots = {
  getNewVideos: require("./robots/getNewVideos.js"),
  setUrls: require("./robots/setUrls"),
  postman: require("./robots/postman.js"),
};

async function start() {
  try {
    const youtube = {
      channels: [],
      servers: [],
      newVideos: []
    };

    await robots.getNewVideos(youtube, database);
    await robots.setUrls(youtube);
    await robots.postman(youtube);

    setTimeout(start, 60000);
  } catch (err) {
    console.error(err);
  }
}

module.exports = start;
