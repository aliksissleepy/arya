module.exports = {
    name: "ping",
    category: "Misc",
    description: "Displays the bots ping & uptime.",
    usecase: "ping",
	run: async(bot, message, args) => {
        var totalSeconds = (bot.uptime / 1000);
        var d = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        var h = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        var m = Math.floor(totalSeconds / 60);
        var s = Math.floor(totalSeconds % 60);
		message.channel.send(`yo, my ping is currently \`${Math.round(bot.ws.ping)}ms\`, the bot has been running for \`${d}d, ${h}h, ${m}m, ${s}s\`.`);
    },
};