const discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const express = require("express");
const app = express();
const ejs = require("ejs");
const { isBuffer } = require("util");
const bot = new discord.Client();

bot.login(process.env.tkn);
bot.commands = new discord.Collection();

app.set("port", (process.env.PORT || 5000));
app.set("view engine", "ejs");

app.get("/", function(request, response){
    //response.sendFile(__dirname + '/web/index.html');
    var totalSeconds = (bot.uptime / 1000);
    var d = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    var h = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    var m = Math.floor(totalSeconds / 60);
    var s = Math.floor(totalSeconds % 60);
    response.render("web/index", {botruntime: `${d}d, ${h}h, ${m}m, ${s}s`})
}).listen(app.get("port"), function() {
    console.log("Running on port; ", app.get('port'));
});

var http = require("http");
setInterval(function() {
    http.get("https://arya-discord.herokuapp.com/");
}, 300000);

bot.funcs = {
    getperm: function(member, perm){
        if(!member.hasPermission(perm)){
            return false;
        }else{
            return true;
        };
    }
};

bot.on("ready", () => {
    console.log("Logged in.");
    var currSet = 0;
    bot.user.setPresence({activity: {name: "ur server :p", type: "WATCHING"}, status: "dnd"});
    setInterval(() => {
        if(currSet == 0){
            bot.user.setPresence({activity: {name: "ur server :p", type: "WATCHING"}, status: "dnd"});
            currSet = 1;
        }else{
            bot.user.setPresence({activity: {name: "type ;help for help :p", type: "WATCHING"}, status: "dnd"});
            currSet = 0;
        };
    }, 30000);
});

fs.readdir("./cmds", (err, files) => {
    if(err) console.log(err);

    var jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0){
        console.log("cmds dir empty");
        return;
    };

    jsfiles.forEach((f, i) => {
        var props = require(`./cmds/${f}`);
        bot.commands.set(props.name, props);
    });
});

var cmdList = [];

bot.on("message", async msg => {
    if(msg.author.bot === true) return;

    var prefix = ";";
    var pre = db.fetch(`prefix_${msg.guild.id}`);
    if(pre === null) pre = ";";
    prefix = pre;
    
    const messageSplit = msg.content.split(" ");
    const args = messageSplit.slice(1);
    const cmd = messageSplit[0];
    if(!cmd.startsWith(prefix)) return;

    if(!cmdList.includes(`${msg.guild.id}_${msg.author.id}`)){
        cmdList.push(`${msg.guild.id}_${msg.author.id}`);
        setTimeout(() => {
            cmdList.filter((v) => {
                if(v == `${msg.guild.id}_${msg.author.id}`){
                    cmdList.splice(cmdList.indexOf(v), 1);
                };
            });
        }, 1000);
    };

    const rawCmd = bot.commands.get(cmd.slice(prefix.length));

    if(rawCmd){
        rawCmd.run(bot, msg, args, db, prefix);
    };
})