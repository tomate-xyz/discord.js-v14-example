# Discord.js v14 Example

An example Discord Bot written in JavaScript, utilizing a custom slash command and event handler with categories, using Discord.js @14.18.0

### ⚠️ Notice: This is made for a single Guild usecase! The commands will not be registered globally!

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Folder Structure](#folder-structure)
- [Bot Setup](#bot-setup)
- [Commands](#commands)
- [Events](#events)
- [Running the Bot](#running-the-bot)
- [License](#license)

## Installation

To use this bot, make sure you have [Node.js](https://nodejs.org/) installed (recommended version: 16.9.0 or higher).

```sh
# Clone the repository
git clone https://github.com/tomate-xyz/discord.js-v14-example.git

# Navigate into the project directory
cd discord.js-v14-example

# Install dependencies
npm install
```

## Configuration

1. Rename the `.env.example` file to `.env` in the root directory and add needed data:

```
DISCORD_TOKEN=your_bot_token_here
GUILD_ID=your_guild_id_here
CLIENT_ID=your_bot_client_id_here
OWNER_ID=owner_userid_here
LOCKUP=0 // When Lockup is set to 1, only the owner can interact with the bot.
```

2. Replace the needed values with actual values from your [Discord Developer Portal](https://discord.com/developers/applications).

## Folder Structure

```
discord.js-v14-example/
├── bot/
│   ├── commands/
│   │   ├── administration/
│   │   │   └── ping.js
│   │   └── system/
│   │       └── register.js
│   └── events/
│       └── general/
│           ├── interactionCreate.js
│           └── ready.js
├── bot_modules/
│   ├── bot.js
│   └── utils.js
├── .env
└── package.json
```

## Bot Setup

### Register Slash Commands

Slash commands are automatically registered when the bot is started, or when the `/register` command is used.

## Slash Commands

Slash Commands are stored in the `/commands` directory, categorized into subdirectories like `utility` and `moderation`. Each command follows this structure:

```js
export default {
  name: "ping",
  description: "Pong!",

  async execute(interaction) {
    interaction.reply("Pong!");
  },
};
```

## Events

Events are stored in the `/events` folder and again, can be categorized into subdirectories. Example:

```js
import { Events } from "discord.js";

export default {
  name: Events.ClientReady,
  once: true,

  execute(client) {
    console.log(`Bot is ready. Logged in as: ${client.user.tag}`);
  },
};
```

## Running the Bot

To start the bot, use:

```sh
npm run start
```

Or if using nodemon for auto-reloading:

```sh
npm run dev
```

## License

This project is licensed under the MIT License.
