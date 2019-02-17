const Discord = require("discord.js");
const client = new Discord.Client(); 
const config = require("./config/config.json"); 
const command = require('./controller/commands');

client.login(config.token);

client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`); 
  client.user.setActivity(`Fala comigo bb`);
// caso queira o bot trasmitindo use:
/*
   client.user.setPresence({ game: { name: 'comando', type: 1, url: 'https://www.twitch.tv/ladonegro'} });
    //0 = Jogando
    //  1 = Transmitindo
    //  2 = Ouvindo
    //  3 = Assistindo
      */
});

client.on("guildCreate", guild => {
  console.log(`O bot entrou nos servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});

client.on("guildDelete", guild => {
  console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});


client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();

  command.command(message, args, comando);
});