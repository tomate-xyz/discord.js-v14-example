import { ActivityType } from "discord.js";

export default {
  name: "ready",
  once: true,

  execute(client) {
    console.log(`✅ ${client.user.tag} is online.\n`);

    client.user.setActivity("Online!", {
      type: ActivityType.Competing,
    });
  },
};