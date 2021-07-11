const discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "eval",
    category: "Other",
    description: "evals code - owner only.",
    usecase: `eval **[code]**`,
	run: async(bot, message, args) => {
        if(message.author.id == "849761139378487369"){
            try{eval(args.join(" "));}catch(err){console.log(err)};
        }else{
            return message.channel.send("Don't even try, stupid");
        };
	},
};