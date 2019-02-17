const Ia = require('../ia/index');

async function command(message, args, comando){
  switch(comando){
    case 'ping':
      const m = await message.channel.send("Ping?");
      m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latencia da API é ${Math.round(client.ping)}ms`);
    break;
    case 'say':
      const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{});  
      message.channel.send(sayMessage);
    break;
    case 'apaga':
      const deleteCount = parseInt(args[0], 10);
      if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply("Por favor, forneça um número entre 2 e 100 para o número de mensagens a serem excluídas");
      
      const fetched = await message.channel.fetchMessages({limit: deleteCount});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
    break;
    case 'kika':
      if(!message.member.roles.some(r=>["Nome do cargo 1", "Nome de outro cargo 2"].includes(r.name)) )
        return message.reply("Desculpe, você não tem permissão para usar isto!");
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.reply("Por favor mencione um membro válido deste servidor");
      if(!member.kickable) 
        return message.reply("Eu não posso expulsar este usuário! Eles pode ter um cargo mais alto ou eu não tenho permissões de expulsar?");
      
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "Nenhuma razão fornecida";
      
      await member.kick(reason)
        .catch(error => message.reply(`Desculpe ${message.author} não consegui expulsar o membro devido o: ${error}`));
      message.reply(`${member.user.tag} foi kickado por ${message.author.tag} Motivo: ${reason}`);
    break;
    default:
      const resp = Ia.exec(comando);
      await message.channel.send(`${resp}`);
    break;
  }
}

module.exports.command = command;