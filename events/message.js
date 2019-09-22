module.exports = (client, message) => {
    if (message.content.startsWith('!kick')) {
        const kick = require('../commands/kick')

        module.exports = (client, message) => {
            if (message.content.startsWith('!kick')) {
                return kick(message)
            }
        }
    }
    if (message.content.startsWith('!8ball')) {
        const dice = require('../commands/dice')

        module.exports = (client, message) => {
            if (message.content.startsWith('!8ball')) {
                return dice(message)
            }
        }
    }
}