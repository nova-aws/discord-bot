const { Events } = require("discord.js");
const { Event } = require("../../../structures");
const fs = require("fs");

const janesPath = "./data/janes.json";

module.exports = class extends Event {
  constructor(client) {
    super(client, {
      name: Events.ChannelCreate,
      enabled: true,
    });
  }

  async run(channel) {
    if (!channel.isTextBased()) return;

    if (!fs.existsSync(janesPath)) {
      console.error("[ERROR] File janes.json not found.");
      return;
    }

    const janes = JSON.parse(fs.readFileSync(janesPath, "utf-8"));

    const matchedJane = janes.find(({ jane }) => channel.name.includes(jane));

    if (matchedJane) {
      try {
        await channel.send(matchedJane.response);
        console.log(`[LOG] Sent trigger response in #${channel.name}.`);
      } catch (error) {
        console.error(
          `[ERROR] Could not send message in #${channel.name}:`,
          error
        );
      }
    }
  }
};
