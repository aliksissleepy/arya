const discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "help",
    category: "Misc",
    description: "Lists all commands & guild-specific settings for the bot.",
    usecase: `help *[category]*`,
	run: async(bot, message, args) => {
        const misclist = [];
        const setlist = [];
        const modlist = [];
        const funlist = [];
        const musiclist = [];
        const ecolist = [];

        function insertlis(lis, cmd){
            if(lis.length === 0){
                lis[0] = cmd;
            }else{
                lis[lis.length] = cmd;
            };
        };
        
        bot.commands.forEach(cmd => {
            switch(cmd.category){
                default:
                    message.channel.send("Sorry, I had a problem sorting the command lists.");
                case "Misc":
                    insertlis(misclist, cmd);
                    break;
                case "Fun":
                    insertlis(funlist, cmd);
                    break;
                case "Settings":
                    insertlis(setlist, cmd);
                    break;
                case "Moderation":
                    insertlis(modlist, cmd);
                    break;
                case "Music":
                    insertlis(musiclist, cmd);
                    break;
                case "Eco":
                    insertlis(ecolist, cmd);
                    break;
                case "Other":
                    //admin cmd
            };
        });

        var funcommands = "";
        var misccommands = "";
        var setcommands = "";
        var modcommands = "";
        var musiccommands = "";
        var ecocommands = "";
        const prefix = db.fetch(`prefix_${message.guild.id}`) || ";";

        function makelist(lis, set){
            lis.forEach(cmd => {
                switch(set){
                    case "fun":
                        funcommands += `${prefix}${cmd.name}:DESCNOW${prefix}${cmd.usecase}DESCNOW${cmd.description}NEWCMD`;
                        break;
                    case "misc":
                        misccommands += `${prefix}${cmd.name}:DESCNOW${prefix}${cmd.usecase}DESCNOW${cmd.description}NEWCMD`;
                        break;
                    case "set":
                        setcommands += `${prefix}${cmd.name}:DESCNOW${prefix}${cmd.usecase}DESCNOW${cmd.description}NEWCMD`;
                        break;
                    case "mod":
                        modcommands += `${prefix}${cmd.name}:DESCNOW${prefix}${cmd.usecase}DESCNOW${cmd.description}NEWCMD`;
                        break;
                    case "eco":
                        ecocommands += `${prefix}${cmd.name}:DESCNOW${prefix}${cmd.usecase}DESCNOW${cmd.description}NEWCMD`;
                        break;    
                    case "music":
                        musiccommands += `${prefix}${cmd.name}:DESCNOW${prefix}${cmd.usecase}DESCNOW${cmd.description}NEWCMD`;
                }
            });
        };
        makelist(funlist, "fun");
        makelist(misclist, "misc");
        makelist(setlist, "set");
        makelist(modlist, "mod");
        makelist(musiclist, "music");
        makelist(ecolist, "eco");

        const defaulthelp = new discord.MessageEmbed()
        .setTitle("Command List")
        .setAuthor("arya", "https://i.imgur.com/5JLdW1g.png")
        .setDescription(`You can view every command the bot has using \`${db.fetch(`prefix_${message.guild.id}`)}help [category]\`. Below is a list of command categories you can choose from. If you need any support join our discord here: https://discord.gg/U2xCnArfeP`)
        .addField("Catergories:", `*♢ Fun*\n*♢ Misc*\n*♢ Music*\n*♢ Settings*\n*♢ Moderation*\n*♢ Economy (SOON)*`)
        .setThumbnail("https://media.tenor.com/images/12d274f5021d28c3e581790f1b069a2c/tenor.gif")

        function createembed(title, cmds, gif){
            const embed = new discord.MessageEmbed()
            .setTitle(title)
            .setAuthor("arya", "https://i.imgur.com/5JLdW1g.png")
            .setDescription(`Type \`${db.fetch(`prefix_${message.guild.id}`) || ";"}help\` to get a list of the other command categories. If you need any support join our discord here: https://discord.gg/fRFXB4f\n\nIf an argument is displayed \`**[arg]**\` it is vital to the comand, arguments displayed \`*[arg]*\` are optional.`)
            .addField("Commands:", "\u200b")
            .setThumbnail(gif)

            const cmdtab = cmds.split("NEWCMD");
            cmdtab.forEach(i => {
                if(i.length >= 1){
                    embed.addField(i.split("DESCNOW")[0], "\n**Usage:** " + `\`${i.split("DESCNOW")[1]}\`\n` + "**Details:** " + i.split("DESCNOW")[2], true); 
                };
            });

            return embed;
        };

        if(!args[0]){
            message.channel.send(defaulthelp);
            return;
        };

        switch(args[0].toLowerCase()){
            default:
                message.channel.send(defaulthelp);
                break;
            case "fun":
                message.channel.send(createembed("Fun Commands", funcommands, "https://media.tenor.com/images/b92a29ad9c6dbb13e9d90ac8362657d3/tenor.gif"));
                break;
            case "music":
                message.channel.send(createembed("Music Commands", musiccommands, "https://media.tenor.com/images/d44a2eb411d161183a65c48d66142688/tenor.gif"));
                break;
            case "moderation":
                message.channel.send(createembed("Mod Commands", modcommands, "https://i.gifer.com/GW0e.gif"));
                break;
            case "settings":
                //specific embed
                break;
            case "economy":
                message.channel.send(createembed("Economy Commands", ecocommands, "https://c10.patreonusercontent.com/3/eyJ3Ijo0MDB9/patreon-media/p/reward/4483956/43daa977873c404b8d5cbe2a449d864b/1.gif?token-time=2145916800&token-hash=ZgbgaeBLMYXSlsUmK2doSNT9UT0Y0mjGBUhPTcgRvmw%3D"));
                break;
            case "misc":
                message.channel.send(createembed("Misc Commands", misccommands, "https://media.tenor.com/images/b92a29ad9c6dbb13e9d90ac8362657d3/tenor.gif"));
        };
    },
};