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
        const xml = parser.parseFromString(httpGet(link));
        const itm = xml.getElementsByClassName("border-bottom item-name-container");
        console.log(itm[0]);
        console.log(itm[0].getElementsByTagName('h2')[0]);

        console.log(xml.getElementsByTagName("item-container"));
    },
};