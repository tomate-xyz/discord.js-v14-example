import { MessageFlags } from "discord.js";

export default {
  name: "ping",
  description: "Pong!",
  cooldown: 30,
  default_member_permissions: "Administrator",

  async execute(interaction, client) {
    interaction.reply({
      content: `> Latency: \`${
        Date.now() - interaction.createdTimestamp
      }ms\`\n> API Latency: \`${Math.round(client.ws.ping)}ms\``,
      flags: MessageFlags.Ephemeral,
    });
  },
};
