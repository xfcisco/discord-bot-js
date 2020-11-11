#!/usr/bin/node
const token = "token"
const discord = require('discord.js');
const lilly = new discord.Client();
 
const prompt = (ask) => {
     var ans = ' ';
     try {
		ans = require('child_process')
			.execSync(`echo "${ask}"|dmenu`)
			.toString();
     } catch {
		ans = " ";
     }
   return ans;
 }
 
 function startBot() {
     lilly.on('ready',() => {
         console.log("started lilly");
         lilly.user.setActivity("welp");
         require('child_process')
             .execSync(" notify-send --urgency=LOW --expire-time=1 'Started ArchticZone bot.' ")       
             .toString();                                                                              
     })
 
     lilly.on('message', msg => {
         if(msg.author.bot) return;
         let res = prompt(`[ ${msg.author.username} ]: ${msg.content.toString()}`);
         msg.channel.send(res);
         lilly.user.setStatus('dnd');
   })
 }

function start() {
  try {
    startBot();
  } catch {
    start();
  }
}

start();
lilly.login(token);
