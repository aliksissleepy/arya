const discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "cuddle",
    category: "Fun",
    description: "Sends a warm cuddley gif to the channel, pinging @𝑥.",
    usecase: `cuddle **[@𝑥]**`,
	run: async(bot, message, args) => {
        const target = message.mentions.users.first() || args[0];
        
        const giflist = ["https://i.imgur.com/p2Jt2P5.gif", "https://media1.tenor.com/images/8f8ba3baeecdf28f3e0fa7d4ce1a8586/tenor.gif?itemid=12668750", "https://thumbs.gfycat.com/PeriodicLonelyApisdorsatalaboriosa-size_restricted.gif", "https://media1.tenor.com/images/3b205574d0352d4d61687f835276566d/tenor.gif?itemid=12669039", "https://media1.tenor.com/images/f8c810e24acbdfde36d1908e10e39c28/tenor.gif?itemid=13041470", "https://i.imgur.com/r9aU2xv.gif", "https://pa1.narvii.com/6004/4a589d6cc369ec42110b919cadf579027e7f842b_hq.gif", "https://i.pinimg.com/originals/f2/80/5f/f2805f274471676c96aff2bc9fbedd70.gif", "https://media1.tenor.com/images/3c295a01cf438f45d07ec5f8b1f9dd4e/tenor.gif?itemid=12668760", "https://i.pinimg.com/originals/01/2c/c6/012cc6d6cb65c3c98bd5505ab2e1c42a.gif", "https://thumbs.gfycat.com/NiftyNeglectedAstarte-max-1mb.gif", "https://media1.tenor.com/images/d0c2e7382742f1faf8fcb44db268615f/tenor.gif?itemid=5853736", "https://media1.tenor.com/images/d16a9affe8915e6413b0c1f1d380b2ee/tenor.gif?itemid=12669052", "https://i.pinimg.com/originals/8a/92/20/8a9220b8ccd56679dc7fd9ffcd03324d.gif", "https://68.media.tumblr.com/de024e35a6c028da207b1b42024a86d1/tumblr_oowor8PVUB1uw5hsdo1_1280.gif", "https://i.kym-cdn.com/photos/images/newsfeed/000/987/510/f81.gif"];

        var lastchose = db.fetch(`lastcuddlegif_${message.guild.id}`);
        var rannum = Math.floor(Math.random() * giflist.length);
        do{
            rannum = Math.floor(Math.random() * giflist.length);
        }while(lastchose == rannum);

        db.set(`lastcuddlegif_${message.guild.id}`, rannum);

        const ouch = new discord.MessageEmbed()
        .setColor("#912937")
        .setDescription(`<@${message.author.id}> cuddles <@${target.id}> hehe <3`)
        .setImage(`${giflist[rannum]}`)
        .setTimestamp()
        .setFooter("Warmmmmmm...");

        message.channel.send(ouch);
	},
};