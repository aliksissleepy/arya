const discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "slap",
    category: "Fun",
    description: "Sends a slapping gif to the channel, pinging @𝑥.",
    usecase: `slap **[@𝑥]**`,
	run: async(bot, message, args) => {
        const target = message.mentions.users.first() || args[0];
        
        const giflist = ["https://i.imgur.com/fm49srQ.gif", "https://i.pinimg.com/originals/4e/9e/a1/4e9ea150354ad3159339b202cbc6cad9.gif", "https://media1.tenor.com/images/e8f880b13c17d61810ac381b2f6a93c3/tenor.gif?itemid=17897236", "https://media2.giphy.com/media/Gf3AUz3eBNbTW/giphy.gif", "https://i.pinimg.com/originals/f8/5f/4c/f85f4c557e5a03d2a7a2e903b66e0047.gif", "https://i.pinimg.com/originals/b6/e3/9e/b6e39e693be3968d212b0fe5754f85db.gif", "https://i.imgur.com/RKegLkw.gif", "https://i.imgur.com/eNiOIMB.gif", "https://i.imgur.com/oOCq3Bt.gif", "https://i.pinimg.com/originals/b0/a7/8b/b0a78b527317430cee98d326c85d1572.gif", "https://i.imgur.com/TuSUTg5.gif", "https://i.imgur.com/BYeAoax.gif"];

        var lastchose = db.fetch(`lastslapgif_${message.guild.id}`);
        var rannum = Math.floor(Math.random() * giflist.length);
        do{
            rannum = Math.floor(Math.random() * giflist.length);
        }while(lastchose == rannum);

        db.set(`lastslapgif_${message.guild.id}`, rannum);

        const ouch = new discord.MessageEmbed()
        .setColor("#912937")
        .setDescription(`<@${message.author.id}> just slapped <@${target.id}>, ouchhh`)
        .setImage(`${giflist[rannum]}`)
        .setTimestamp()
        .setFooter("That was mean.");

        message.channel.send(ouch);
	},
};