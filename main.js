const { Client, Intents, Collection, MessageEmbed} = require('discord.js');
const { loadCommands, loadEvents } = require("./util/loader");
const fs = require("fs");
const client = new Client({ 
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
    Intents.FLAGS.GUILD_MESSAGE_TYPING, 
    Intents.FLAGS.DIRECT_MESSAGES, 
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,  
  ] 
});
require("./util/functions")(client);
const mongoose = require('mongoose');

client.config = require("./config");
client.mongoose = require("./util/mongoose");
["commands", "cooldowns"].forEach(x => client[x] = new Collection());
client.ticketTranscript = mongoose.model('transcript', 
  new mongoose.Schema({
    channel: String,
    Content: Array
  })
)

client.on('messageCreate', async(message) => {
    if(message.channel.parentId !== '917489921881698354') return;
    client.ticketTranscript.findOne({ channel: message.channel.id }, async(err, data) => {
      if(err) throw err;
      if(data) {
        data.Content.push(`${message.author.tag}: ${message.content}`)
      } else {
        data = new client.ticketTranscript({ channel: message.channel.id, Content: `${message.author.tag}: ${message.content}`})
      }
      await data.save()
        .catch(err => console.log(err));
    })
  })

loadCommands(client);
loadEvents(client);
client.mongoose.init();

client.login(client.config.TOKEN);
