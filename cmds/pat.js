const discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "pat",
    category: "Fun",
    description: "Sends a patting gif to the channel, pinging @𝑥.",
    usecase: `pat **[@𝑥]**`,
	run: async(bot, message, args) => {
        const target = message.mentions.users.first() || args[0];
        
        const giflist = ["https://media1.tenor.com/images/da8f0e8dd1a7f7db5298bda9cc648a9a/tenor.gif?itemid=12018819", "https://media1.tenor.com/images/d7c326bd43776f1e0df6f63956230eb4/tenor.gif?itemid=17187002", "https://thumbs.gfycat.com/BlushingDeepBlacknorwegianelkhound-small.gif", "https://media1.tenor.com/images/fb3e0b0f18188450bfded4a585de2b90/tenor.gif?itemid=8208759", "https://community.gamepress.gg/uploads/default/original/3X/9/b/9ba2ca6b6b2a9604fda19ad197311dca79d40656.gif", "https://i.gifer.com/KJ42.gif", "https://data.whicdn.com/images/297125626/original.gif", "https://31.media.tumblr.com/6f791348bd5e79847586821761dbaea1/tumblr_migh1bc0Av1rikjd2o1_500.gif", "https://data.whicdn.com/images/297156876/original.gif", "https://thumbs.gfycat.com/ShockingFaroffJavalina-size_restricted.gif", "https://media1.tenor.com/images/70960e87fb9454df6a1d15c96c9ad955/tenor.gif?itemid=10092582", "https://media1.tenor.com/images/6151c42c94df654b1c7de2fdebaa6bd1/tenor.gif?itemid=16456868"];

        var lastchose = db.fetch(`lastpatgif_${message.guild.id}`);
        var rannum = Math.floor(Math.random() * giflist.length);
        do{
            rannum = Math.floor(Math.random() * giflist.length);
        }while(lastchose == rannum);

        db.set(`lastpatgif_${message.guild.id}`, rannum);

        const ouch = new discord.MessageEmbed()
        .setColor("#912937")
        .setDescription(`<@${message.author.id}> just gave <@${target.id}> pats hehe`)
        .setImage(`${giflist[rannum]}`)
        .setTimestamp()
        .setFooter(">:)))");

        message.channel.send(ouch);
	},
};