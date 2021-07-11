const discord = require("discord.js")
const db = require("quick.db");

module.exports = {
    name: "bite",
    category: "Fun",
    description: "Sends a biting gif to the channel, pinging @𝑥.",
    usecase: `bite **[@𝑥]**`,
	run: async(bot, message, args) => {
        const target = message.mentions.users.first() || args[0];
        
        const giflist = ["https://i.pinimg.com/originals/e0/0f/31/e00f3104927ae27d7d6a32393d163176.gif", "https://media1.tenor.com/images/c22a247affcf4cd02c7d17f5a432cd95/tenor.gif?itemid=8259627", "https://i.pinimg.com/originals/17/f0/fc/17f0fc8bc1e0d5df5f519b8cd9237ac8.gif", "https://media1.tenor.com/images/0d192209c8e9bcd9826af63ba72fc584/tenor.gif?itemid=15164408", "https://31.media.tumblr.com/4b0039bd1e7d9e35b50d7935c4958a5c/tumblr_mysv0ifpeP1t3nsk7o2_500.gif", "https://thumbs.gfycat.com/NeedyEvenKangaroo-small.gif", "https://78.media.tumblr.com/206dbf12d5a0e790796057d34f2f633c/tumblr_o0lb77IGsn1u9u1mvo1_500.gif", "https://1.bp.blogspot.com/-WVysG3ES34o/WHQYX2VHIvI/AAAAAAAAtHE/Bt773uJfdnkRXUZL1DaVAbSkegdU2T-rgCPcB/s1600/Omake%2BGif%2BAnime%2B-%2BDemi-chan%2Bwa%2BKataritai%2B-%2BEpisode%2B1%2B-%2BHikari%2BVampire%2BBites%2BYuki%2BSnow%2BWoman.gif"];

        var lastchose = db.fetch(`lastbitegif_${message.guild.id}`);
        var rannum = Math.floor(Math.random() * giflist.length);
        do{
            rannum = Math.floor(Math.random() * giflist.length);
        }while(lastchose == rannum);

        db.set(`lastbitegif_${message.guild.id}`, rannum);

        const ouch = new discord.MessageEmbed()
        .setColor("#912937")
        .setDescription(`<@${message.author.id}> just bit <@${target.id}>, ouchhhhh!`)
        .setImage(`${giflist[rannum]}`)
        .setTimestamp()
        .setFooter("nom nom");

        message.channel.send(ouch);
	},
};