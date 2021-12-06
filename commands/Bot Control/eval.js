module.exports.run = async (client, message, args) => {
  function clean(text) {
    if (typeof text === "string") 
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }

  const code = args.join(" ");
  const evaled = eval(code);
  const cleanCode = await clean(evaled);
  message.channel.send(cleanCode, { code: "js" });
};

module.exports.help = {
  name: "eval",
  aliases: ['ev'],
  category: 'botcontrol',
  description: "Permet d'éxecuter du code javascript et de renvoyer une réponse true ou false.",
  cooldown: 5,
  usage: '<code>',
  args: true,
  owner: true,
};
