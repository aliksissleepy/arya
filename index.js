const discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
var express = require("express");
var app = express();
const { isBuffer } = require("util");
const bot = new discord.Client();
bot.login(process.env.tkn);
bot.commands = new discord.Collection();
app.set("port", (process.env.PORT || 5000));
app.get("/", function(request, response) {
    var result = "Running"
    response.send(result);
}).listen(app.get("port"), function() {
    console.log("Running on port; ", app.get('port'));
});

bot.on("ready", () => {
    console.log("Logged in.");
    bot.user.setPresence({activity: {name: "ur server :p", type: "WATCHING"}, status: "dnd"});
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
            })
        }, 1000);
    };

    const rawCmd = bot.commands.get(cmd.slice(prefix.length));

    if(rawCmd){
        rawCmd.run(bot, msg, args, db);
    };
})