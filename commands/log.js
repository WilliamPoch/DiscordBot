module.exports = (client, message) => {
    console.log('in')
    message.channel.fetchMessages({ limit: 100, before: message.id })
        .then(messages => console.log('received ${messages.size} messages'))
        .catch(console.error);
}