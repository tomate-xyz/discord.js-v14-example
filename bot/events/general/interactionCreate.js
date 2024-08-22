import * as utils from '../../../bot_modules/utils.js';
import dotenv from 'dotenv';
dotenv.config()

const cooldowns = new Map();

export default {
    name: 'interactionCreate',
    once: false,

    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const {
            commandName
        } = interaction;
        const command = client.commands.get(commandName);

        if (!client.commands.has(commandName)) return;

        if (process.env.LOCKUP === "1" && interaction.user.id !== process.env.OWNER_ID) {
            return interaction.reply({
                embeds: [utils.easyEmbed("#ff0000", "The bot is currently locked")],
                ephemeral: true
            });
        }

        if (command.devOnly && interaction.user.id !== process.env.OWNER_ID) {
            return interaction.reply({
                embeds: [utils.easyEmbed("#ff0000", "This command is currently inaccessible")],
                ephemeral: true
            });
        }

        if (command.cooldown) {
            const now = Date.now();
            const cooldownAmount = command.cooldown * 1000;

            if (cooldowns.has(commandName)) {
                const expirationTime = cooldowns.get(commandName) + cooldownAmount;

                const timeLeft = expirationTime - now;

                const formattedTimeLeft = (timeLeft / 1000).toLocaleString(undefined, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                });

                if (now < expirationTime) {
                    return interaction.reply({
                        embeds: [utils.easyEmbed("#ffff00", "Cooldown", `Please wait ${formattedTimeLeft}s before using this command again`)],
                        ephemeral: true
                    });
                }
            }

            cooldowns.set(commandName, now);

            setTimeout(() => cooldowns.delete(commandName), cooldownAmount);
        }

        try {
            const command = client.commands.get(commandName);
            await command.execute(interaction, client);

        } catch (error) {
            console.error(`Error executing command ${commandName}:`, error);
            interaction.reply({
                content: `An error occurred while executing the command.\n${error}`,
                ephemeral: true
            });
        }
    }
};