const xmlh = require("xmlhttprequest");
var DomParser = require('dom-parser');
var parser = new DomParser();
const discord = require("discord.js");

function isRblxLink(string){
    if(!string.includes("https://www.roblox.com/catalog/")) return false;
    return true;
};

function httpGet(theUrl){
    var xmlHttp = new xmlh.XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
};

module.exports = {
    name: "reportclothing",
    category: "Hail",
    description: "Reports stolen clothing to mods.",
    usecase: "reportclothing **[link]**",
	run: async(bot, message, args, db, prefix) => {
        if(message.guild.id != "837766482875121684") return;
        const link = args[0];
        if(!isRblxLink(link)){
            message.channel.send(`Sorry, you must provide a valid roblox link in the format \`${prefix}reportclothing https://www.roblox.com/catalog/ID\`.`)
            return;
        };
        message.channel.send("Thank you for your report, this will be looked into by our moderation team!")
        const xml = parser.parseFromString(httpGet(link));
        const nameItm = xml.getElementsByClassName("border-bottom item-name-container");
        var lns = nameItm[0].textContent.split("\n");
        const itmName = lns[1];
        const itmAuthor = lns[4];
        
        const report = new discord.MessageEmbed()
        .setColor("#912937")
        .setTitle(`New report from [${message.author.id}]`)
        .addFields({name: "Link", value: link}, {name: "Name", itmName}, {name: "Author", itmAuthor})
        .setTimestamp()
        .setFooter("Reported for DMCA");

        bot.guilds.cache.get("846096237941489686").channels.cache.get("866003201748369458").send(report);
    },
};