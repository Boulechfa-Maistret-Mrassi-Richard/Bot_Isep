// je suis anis
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
  if (msg.content.match(/!spotify track.*/)) {
    var infovaleur = msg.content.substring(9)

    spotify.search({ type: 'track', query: infovaleur }, function (err, data) {
      if (!err) {
        msg.channel.sendMessage('résultat track le premier le plus proban :' + data.tracks.items[0].external_urls.spotify)
        msg.channel.sendMessage('résultat track le second le plus proban :' + data.tracks.items[1].external_urls.spotify)
        msg.channel.sendMessage('résultat track le troisième le plus proban :' + data.tracks.items[2].external_urls.spotify)
        // o est le 1er terme
      }
    })
    spotify.search({ type: 'album', query: infovaleur }, function (err, data) {
      if (!err) {
        msg.channel.sendMessage('résultat album le premier le plus proban :' + data.albums.items[0].external_urls.spotify)
        msg.channel.sendMessage('résultat album le second le plus proban :' + data.albums.items[1].external_urls.spotify)
        msg.channel.sendMessage('résultat album le troisième le plus proban :' + data.albums.items[2].external_urls.spotify)
        // o est le 1er terme
      }
    })
    spotify.search({ type: 'artist', query: infovaleur }, function (err, data) {
      if (!err) {
        msg.channel.sendMessage('résultat artist le premier le plus proban :' + data.artists.items[0].external_urls.spotify)
        msg.channel.sendMessage('résultat artist le second le plus proban :' + data.artists.items[1].external_urls.spotify)
        msg.channel.sendMessage('résultat artist le troisième le plus proban :' + data.artists.items[2].external_urls.spotify)
        // o est le 1er terme
      }
    })
  }
})

client.login(config.token)
