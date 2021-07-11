const discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "kill",
    category: "Fun",
    description: "Sends a gif of someone murdering someone else, pinging @𝑥.",
    usecase: `kill **[@𝑥]**`,
	run: async(bot, message, args) => {
        const target = message.mentions.users.first() || args[0];
        
        const giflist = ["https://pa1.narvii.com/6714/56e63e1f35a127403251bf38e9cbcae404e35c13_hq.gif", "https://i.pinimg.com/originals/9d/50/a9/9d50a9437eb26393b76b3ac983133dac.gif", "https://pa1.narvii.com/6707/6ae3b8b613788732ddf5c219eef04873977d95e4_hq.gif", "https://i.imgur.com/m8ZtlNO.gif", "https://media1.tenor.com/images/46051e203deaefc5642916c1eafa54a7/tenor.gif?itemid=3660367", "https://media3.giphy.com/media/sxfw7IWQ8y3iE/giphy.gif", "https://i.imgur.com/soXFedi.gif", "https://pa1.narvii.com/5603/3fb4a1cc87f3563c7d5415eecb18cfd18a8b905b_hq.gif", "https://pa1.narvii.com/6101/1343d21af04d17f5f616af8743ff1a3376347997_hq.gif", "https://38.media.tumblr.com/18940139d69aa0346f7300167d3983d5/tumblr_new7qxrEYS1t89rpeo2_500.gif", "https://i.pinimg.com/originals/5d/4a/09/5d4a09f6aebb9f29d9eeda97d86643da.gif", "https://www.hxchector.com/wp-content/uploads/2015/04/attack-on-titan-s1-mikasa-titan-kill.gif", "https://seyiagboola.files.wordpress.com/2015/03/lubbagif1.gif"];
    
        var lastchose = db.fetch(`lastkillgif_${message.guild.id}`);
        var rannum = Math.floor(Math.random() * giflist.length);
        do{
            rannum = Math.floor(Math.random() * giflist.length);
        }while(lastchose == rannum);

        db.set(`lastkillgif_${message.guild.id}`, rannum);

        const ouch = new discord.MessageEmbed()
        .setColor("#912937")
        .setDescription(`<@${message.author.id}> just killed <@${target.id}> 👀`)
        .setImage(`${giflist[rannum]}`)
        .setTimestamp()
        .setFooter("Ouch.");

        message.channel.send(ouch);
	},
};