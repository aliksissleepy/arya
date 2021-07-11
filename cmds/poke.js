const discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "poke",
    category: "Fun",
    description: "Sends a poking gif to the channel, pinging @𝑥.",
    usecase: `poke **[@𝑥]**`,
	run: async(bot, message, args) => {
        const target = message.mentions.users.first() || args[0];
        
        const giflist = ["https://i.pinimg.com/originals/b4/95/fb/b495fb19f4b9a1b04f48297b676c497b.gif", "https://media1.tenor.com/images/3b9cffb5b30236f678fdccf442006a43/tenor.gif?itemid=7739077", "https://media2.giphy.com/media/FdinyvXRa8zekBkcdK/giphy.gif", "https://i.gifer.com/S00v.gif", "https://thumbs.gfycat.com/KeyImaginativeBushsqueaker-size_restricted.gif", "https://media1.tenor.com/images/3b2bfd09965bd77f2a8cb9ba59cedbe4/tenor.gif?itemid=5607667", "https://media1.tenor.com/images/1e0ea8b241a7db2b9c03775133138733/tenor.gif?itemid=10064326", "https://memestatic.fjcdn.com/gifs/Anime+girl+gifs_2a30e9_6970665.gif", "https://thumbs.gfycat.com/EnlightenedInferiorAfricanaugurbuzzard-size_restricted.gif", "https://blog-imgs-62.fc2.com/g/a/r/garethbale/31Gb2vfc7p2.gif", ];

        var lastchose = db.fetch(`lastpokegif_${message.guild.id}`);
        var rannum = Math.floor(Math.random() * giflist.length);
        do{
            rannum = Math.floor(Math.random() * giflist.length);
        }while(lastchose == rannum);

        db.set(`lastpokegif_${message.guild.id}`, rannum);

        const ouch = new discord.MessageEmbed()
        .setColor("#912937")
        .setDescription(`<@${message.author.id}> just poked <@${target.id}> 👉`)
        .setImage(`${giflist[rannum]}`)
        .setTimestamp()
        .setFooter("poke poke");

        message.channel.send(ouch);
	},
};