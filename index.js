const discord = require("discord.js");
const fs = require("fs");
const bot = new discord.Client();
bot.login(process.env.tkn);
bot.commands = new discord.Collection();

bot.on("ready", () => {
    console.log("Logged in.");
    bot.user.setPresence({activity: {name: "ur server:p", type: "WATCHING"}, status: "dnd"});
});