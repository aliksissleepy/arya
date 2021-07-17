const XMLHttpRequest = require("xmlhttprequest");

function isRblxLink(string){
    if(!string.includes("https://www.roblox.com/catalog/")) return false;
    return true;
};

function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

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
        console.log(httpGet(link));
    },
};