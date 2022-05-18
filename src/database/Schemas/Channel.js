const { Schema, model } = require("mongoose");

const schemaChannel = new Schema({
  _id: { type: String, required: true },
  lastVideoId: { type: String, default: "initial value" },
  servers: [{
    serverId: { type: String, required: true },
    webhookUrl: { type: String, required: true },
    message: { type: String, required: true },
  }],
});

const Channel = model("youtube_channels", schemaChannel);
module.exports = Channel;
