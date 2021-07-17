const xmlh = require("xmlhttprequest");
var DomParser = require('dom-parser');
var parser = new DomParser();

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
        if(!message.guild.id === "837766482875121684") return;
        const link = args[0];
        if(!isRblxLink(link)){
            message.channel.send(`Sorry, you must provide a valid roblox link in the format \`${prefix}reportclothing https://www.roblox.com/catalog/ID\`.`)
            return;
        };
        message.channel.send("Thank you for your report, this will be looked into by our moderation team!")
        const xml = parser.parseFromString(httpGet(link));
        const nameItm = xml.getElementsByClassName("border-bottom item-name-container");
        var lns = nameItm[0].textContent.split("\n");
        var itmName = lns[1];
        var itmAuthor = lns[4];
        var dateItm = xml.getElementsByAttribute("class", "date-time-i18n");
        console.log(dateItm[0].innerHTML)
        
        //var datelns = dateItm[0].textContent.split("\n");
        //var itmDate = datelns[0]
        //console.log(datelns[0] + "\n" + datelns[1]);
    },
};