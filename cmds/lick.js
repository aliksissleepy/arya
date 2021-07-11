const discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "lick",
    category: "Fun",
    description: "Sends a licking gif to the channel, pinging @𝑥.",
    usecase: `lick **[@𝑥]**`,
	run: async(bot, message, args) => {
        const target = message.mentions.users.first() || args[0];
        
        const giflist = ["https://media1.tenor.com/images/b00d152c5645975a06c4916e360635ef/tenor.gif?itemid=15900643", "https://media1.tenor.com/images/c1d9ff6f013a3deba4b7941fa00374e5/tenor.gif?itemid=16150817", "https://i.pinimg.com/originals/ce/f5/69/cef569820773b0f5d54ee34cfa18e1f8.gif", "https://i.imgur.com/Clk8A6M.gif", "https://media1.tenor.com/images/a3d2e38bed3d3ee648328b37409c4d87/tenor.gif?itemid=13886203", "https://i.imgur.com/DylehYr.gif", "https://media1.tenor.com/images/1759115e1cccc344e6954519ed974ee5/tenor.gif?itemid=15900646", "https://i.imgur.com/c013HA6.gif", "https://gifimage.net/wp-content/uploads/2017/09/anime-lick-gif-4.gif"];

        var lastchose = db.fetch(`lastlickgif_${message.guild.id}`);
        var rannum = Math.floor(Math.random() * giflist.length);
        do{
            rannum = Math.floor(Math.random() * giflist.length);
        }while(lastchose == rannum);

        db.set(`lastlickgif_${message.guild.id}`, rannum);

        const ouch = new discord.MessageEmbed()
        .setColor("#912937")
        .setDescription(`<@${message.author.id}> just licked <@${target.id}> >:)`)
        .setImage(`${giflist[rannum]}`)
        .setTimestamp()
        .setFooter("yummy");

        message.channel.send(ouch);
	},
};