module.exports = {
    name: 'ping',
    aliases: ["p"],
    description: 'a cool ping pong command',
    async execute(message, client) {
        message.reply({content:`Pong`});
    }
}