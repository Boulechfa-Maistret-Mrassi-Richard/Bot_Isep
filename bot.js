// je suis Alexandre
// je suis Anis

const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var spotify = require('spotify')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (!config.channels[msg.channel.id] || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  }
  if (msg.content.match(/!spotify.*/)) {
    var artistename = msg.content.substring(9)

    spotify.search({ type: 'track', query: artistename }, function (err, data) {
      if (!err) {
        msg.channel.sendMessage('résultat morceau :' + data)
        // o est le 1er terme
      }
    })
  }
})

client.login(config.token)
