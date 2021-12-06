const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { EMOTEMBED: defaults } = require("../../config.js");

module.exports.run = async (client, message, args) => {
 if(message.user.id != '512718827046567936') return;
 if(message && message.deletable) message.delete().catch(e => {});
  const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('ticketopen')
					.setLabel('Ouvrir un ticket')
					.setStyle('PRIMARY'),
			);
  let embed = new MessageEmbed()
  .setTitle(`Créer un nouveau ticket`)
  .setColor(defaults.dcolor)
  .setDescription(`Vous avez une question ? Vous rencontrez un souci sur RDC ?\nN'hésitez pas à créer un ticket !\n
  Un membre de notre équipe communautaire vous répondra dès que possible !`)
  .setFooter(`RDC Community Support`, client.user.displayAvatarURL())
  message.channel.send({embeds:[embed], components: [row]});
};

module.exports.help = {
  name: "ticket-setup",
  aliases: ['ts'],
  category: 'botconfig',
  description: "Setup du système de ticket.",
  cooldown: 5,
  usage: '',
  args: false,
  perm: true
};