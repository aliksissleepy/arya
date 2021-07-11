const db = require("quick.db");

module.exports = {
    name: "setprefix",
    category: "Settings",
    description: "Sets per-guild prefix for the bot.",
    usecase: "setprefix **[prefix]**",
	run: async(bot, message, args) => {
        const newprefix = args[0];
        if(!bot.funcs.getperm(message.member, "ADMINISTRATOR")){
                return message.channel.send("You need Administrative privileges to do that.");
        };
        if(!args[0]) message.channel.send("Please provide a prefix.");
        db.set(`prefix_${message.guild.id}`, newprefix);
        message.channel.send(`Set prefix to \`${newprefix}\` for this guild!`);
	},
};