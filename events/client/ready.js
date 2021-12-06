const { Message, MessageEmbed } = require("discord.js");
const ms = require('ms');
module.exports = client => {

  const guild = [];
  client.guilds.cache.map(e => guild.push(e));
  guild.forEach(async g => {
    const data = await client.getGuild(g);
    if (!data){
      client.createGuild({guildID: g.id, prefix: "!", ticket: false, modrole: ""})
      client.createLogs({guildID: g.id, logs: false, logschannel: ""});
    } 
  });

  let activities = [
    //`$help | ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} membres`,
    `Le monde est irréel, sauf quand il est chiant.`,
    `Je suis là pour servir le seigneur des chats.`,
    `Eh bien, me voilà. Quels sont vos deux autres vœux ?`,
    `Je suis le résultat d'un 20 naturel.`,
    `Être bizarre est l'effet secondaire de la génialité.`,
    `Je ne suis pas en ligne, c'est juste une illusion d'optique.`,
    `Jeter de l'ombre comme des confettis.`,
    `J'ai perdu la tête. Je reviens dans cinq minutes.`,
    `Secrètement un sorcier.`,
    `Je ne suis pas spécial, je suis une édition limitée.`,
    `Dieu est vraiment créatif. Je veux dire, regarde-moi.`,
  ], i = 0;

  setInterval(() => client.user.setPresence({ activities: [{ name: `${activities[i ++ % activities.length]}`, type: 'WATCHING' }], status: 'dnd' }), 60000);  
  //setInterval(() => client.user.setPresence({ activity: { name: `${activities[i ++ % activities.length]}`, type: 'WATCHING' }, status: 'dnd' }), 60000);  
};

//Le monde est irréel, sauf quand il est chiant
//Je suis là pour servir le seigneur des chats.
//Eh bien, me voilà. Quels sont vos deux autres vœux ?
//Je suis le résultat d'un 20 naturel.
//Être bizarre est l'effet secondaire de la génialité.
//Je ne suis pas en ligne, c'est juste une illusion d'optique.
//Jeter de l'ombre comme des confettis.
//J'ai perdu la tête. Je reviens dans cinq minutes.
//Secrètement un sorcier.
//Je ne suis pas spécial, je suis une édition limitée.
//Dieu est vraiment créatif. Je veux dire, regarde-moi.

//${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} membres