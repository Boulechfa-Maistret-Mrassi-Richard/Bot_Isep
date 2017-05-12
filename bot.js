// je suis Alexandre
import Youtube from 'youtube-api'
const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  } else if (msg.content === 'Flanders') {
    msg.channel.sendMessage('Dégage ! :O')
  } else if (msg.content === 'Flanders') {
    msg.channel.sendMessage('Dégage ! :O')
  }
} else if (msg.content === 'Youtube') {
    msg.channel.sendMessage('Dégage ! :O')
  }
})

client.login(config.token)
