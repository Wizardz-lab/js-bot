module.exports = {
    name: 'ban',
    aliases: ["b"],
    description: 'a simple ban command',
    async execute(message, args) {
        let member = message.mentions.members.first();
        let reason = args[1];
        if(!member) return message.reply({content:"Please specify a member"});
        if(!reason) return message.reply({content:"Please specify a reason!"});

        try {
            member.ban()
            await message.reply({content:`${member} has been banned from this guild!\nReason: ${reason}`});
        } catch (e) {
            console.error(e);
            await message.reply({content:`\`\`\`js\n${e}\n\n\n`});
        }
    }
}