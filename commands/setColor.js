module.exports = message => {
    let guildmember = message.member;
    var messagesplit = message.content.split(" ");
    var roles = ["0", "1", "2", "3", "4", "5", "6", "7"];
    let role = message.guild.roles.find(r => r.name == roles[messagesplit[1]]);

    if (roles.includes(messagesplit[1])) {
        
        if (message.member.roles.find(r => roles.includes(r.name))) {
            guildmember.removeRole(guildmember.colorRole);
            guildmember.addRole(role).catch(console.error);
        } else { 
            guildmember.addRole(role).catch(console.error);        
        }
    } else {
        message.reply("Please specify a role: " + roles);
    }
    
    
    
    
}