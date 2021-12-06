const { Message, MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction } = require("discord.js");
const { EMOTEMBED: defaults } = require("../../config.js");
const ms = require('ms');
const moment = require('moment')
const schema = require('../../models/ticket');

module.exports = async (client, interaction) => {
  if(!interaction.isButton()) return;
  if(interaction.customId != "ticketcloseno") return;
  const settingsg = await client.getGuild(interaction.guild);
  /*if(!interaction.member.roles.cache.has(settingsg.modrole)) interaction.reply({content: "Vous n'avez pas les permissions nécessaire pour appuyer sur ce boutton !", ephemeral: true})*/
  interaction.deferUpdate()
  .catch(console.error);
  //console.log(interaction)
  const user = interaction.user;
  const guild = interaction.guild
  const settings = await client.getLogs(interaction.guild);
  let logsChannel = guild.channels.cache.find(c => c.id === settings.logschannel);
  let channel = guild.channels.cache.find(c => c.id === interaction.channelId).name;
  let ticketid = channel.substr(7, 10);
  //console.log(ticketid)
  schema.findOne({ guildID: guild.id, ticketID: ticketid}, async(err, data) => {
      if(err) throw err;
      if(data) {  
        let close = new MessageEmbed()
          .setColor(defaults.dcolor)
          .setTitle("Fermeture du ticket")
          .setDescription("Fermeture annulée")
        interaction.message.channel.send({embeds:[close]})
      } else {

      }
  });

  
  //ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}
  //find already create ticket
  //if(!message.guild.channels.cache.find(c => c.name === `ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`)){
  //find if user have role
  //let role = message.guild.roles.cache.find(r => r.name === "Ticket Support");


  
  // ========================= //
  // FERMETURE DU TICKET //
  // ========================= //

 /* if(message.embeds.length === 1 && message.embeds[0].title === '🎟️ | Ticket Terminé' && message.embeds[0].description === `Réagissez avec \\🗑️ pour fermer le ticket ou ne réagissez pas si vous avez d'autres demandes.`){
    if(reaction.emoji.name === "🗑️"){
      if(user.id === db.get(`ticket.${message.channel.name}.user`)){

        let deletedEmbed = new MessageEmbed()
        .setAuthor(`🗑️ | Ticket Fermé`)
        .setColor(color.rdc)
        .setDescription(`L'auteur a confirmé la fermeture du ticket.`)
        .setTimestamp()
        .setFooter(`Système de Ticket`, bot.user.displayAvatarURL())
        .addField(`Informations`, `**Utilisateur :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);

        message.channel.send('Le ticket s\'auto détruiras dans 5 secondes...');
        setTimeout(() => {
          message.channel.delete().then(async ch => {
            bot.ticketTranscript.findOne({ channel: ch.id }, async(err, data) => {
              if(err) throw err;
              if(data){
                db.delete(`ticket.${message.channel.name}`);
                if(logsChannel) logsChannel.send(deletedEmbed);
                const cha = ch.id;
                fs.writeFileSync(`../RdcSupport/tickets/${ch.id}.txt`, data.Content.join("\n\n"));
                //transcriptChannel.send(`Le ticket de ${message.guild.members.cache.get(ch.name).user.username} a été fermé.`);
                await logsChannel.send(new MessageAttachment(fs.createReadStream(`../RdcSupport/tickets/${ch.id}.txt`)));
                bot.ticketTranscript.findOneAndDelete({ channel: cha});
              }
            })
          })
        }, 5000)
        //message.channel.delete();
      }
    }
  }*/

};
