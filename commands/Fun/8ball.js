const Discord = require('discord.js');

module.exports = {
  name: '8ball',
  description: 'a cool 8ball command',
  aliases: ["ball"],
  async execute(message, args, client) {
    let qn = args.join(" ")
    if(!qn) return message.reply({content:"Please specify a question!"});
    let messages = [
      "No.",
      "Yes.",
      "Ofcourse",
      "Not really",
      "Not at all",
      "Why not?",
      "That's a no for me",
      "That's a yes for me"
    ]
    let msgs = Math.floor(Math.random() * messages.length)
    const embed = new Discord.MessageEmbed()
    .setTitle("The 8ball has spoken!")
    .setColor("GREEN")
    .setDescription(`> **Question: ${qn}**\n> **Answer: ${messages[msgs]}**`)
    message.reply({embeds:[embed]});
  }
}
