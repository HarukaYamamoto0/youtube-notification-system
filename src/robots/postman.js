const { WebhookClient } = require("discord.js");

async function robot(youtube) {
  const servers = youtube.servers;
  if (!servers.length) return;

  for (const server of servers) {
    try {
      const webhook = new WebhookClient({ url: server.webhookUrl });
      const message = server.message.replace("{{link}}", server.url + " oi");

      await webhook.send({
        content: message,
        username: process.env.username,
        avatarURL: process.env.avatarURL,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = robot;
