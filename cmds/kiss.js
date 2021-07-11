const discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "kiss",
    category: "Fun",
    description: "Sends a kissing gif to the channel, pinging @𝑥.",
    usecase: `kiss **[@𝑥]**`,
	run: async(bot, message, args) => {
        const target = message.mentions.users.first() || args[0];
        
        const giflist = ["https://i.imgur.com/OE7lSSY.gif", "https://media0.giphy.com/media/bm2O3nXTcKJeU/giphy.gif", "https://thumbs.gfycat.com/WarpedSlightFrigatebird-small.gif", "https://data.whicdn.com/images/328631644/original.gif", "https://thumbs.gfycat.com/IdolizedAnxiousAcouchi-small.gif", "https://cdn.lowgif.com/medium/7ed260fa4e44682c-love-chunibyo-and-other-delusions-on-we-heart-it.gif", "https://media1.tenor.com/images/ee88010c910818d2705bbfaeb26e0a91/tenor.gif?itemid=12192868", "https://media1.tenor.com/images/4a76dc4867f4afed8690e4973e1355e0/tenor.gif?itemid=14544797", "https://gifimage.net/wp-content/uploads/2017/10/cute-anime-kiss-gif-2.gif", "https://i.imgur.com/q340AoA.gif", "https://i.pinimg.com/originals/1f/1c/a2/1f1ca2c09f171676503c2533319b354f.gif", "https://cutewallpaper.org/21/romantic-anime-kiss/Anime-Kissing-GIF-Anime-Kissing-Kiss-Discover-and-Share-GIFs.gif", "https://pa1.narvii.com/5648/2c36e900b6eb968de36a8d2efe70d33fbb08cb75_hq.gif"];

        var lastchose = db.fetch(`lastkissgif_${message.guild.id}`);
        var rannum = Math.floor(Math.random() * giflist.length);
        do{
            rannum = Math.floor(Math.random() * giflist.length);
        }while(lastchose == rannum);

        db.set(`lastkissgif_${message.guild.id}`, rannum);

        const ouch = new discord.MessageEmbed()
        .setColor("#912937")
        .setDescription(`<@${message.author.id}> just kissed <@${target.id}> 😳`)
        .setImage(`${giflist[rannum]}`)
        .setTimestamp()
        .setFooter("mwah.");

        message.channel.send(ouch);
	},
};