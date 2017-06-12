const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

var Spotifywebapinode = require('spotify-web-api-node')
var spotifyWebApiNode = new Spotifywebapinode({
  // mes info perso
  clientId: '9eebb5a810f144499c2ba420035fe63d',
  clientSecret: '3c5b4032ffe04793ba970f400cf28dc5'
})
client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  if (msg.channel.type !== 'dm' && (!config.channels[msg.channel.id] || msg.author.id === client.user.id)) return

  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  }
  spotifyWebApiNode.clientCredentialsGrant()
          .then(function (data) {
            spotifyWebApiNode.setAccessToken(data.body['access_token'])
            if (msg.content.match(/!spotify track.*/)) {
              var chansson = msg.content.substring(15)
              spotifyWebApiNode.searchTracks(chansson)
              .then(function (data) {
                msg.channel.sendMessage('Résultats probant numéro 1 pour la recherche track' + data.body.tracks.items[0].external_urls.spotify)
                msg.channel.sendMessage('Résultats probant numéro 2 pour la recherche track' + data.body.tracks.items[1].external_urls.spotify)
                msg.channel.sendMessage('Résultats probant numéro 3 pour la recherche track' + data.body.tracks.items[2].external_urls.spotify)
              })
            } else if (msg.content.match(/!spotify artist.*/)) {
              var chanteur = msg.content.substring(16)
              spotifyWebApiNode.searchArtists(chanteur)
              .then(function (data) {
                msg.channel.sendMessage('Résultats  probant numéro 1 pour la recherche artiste ' + data.body.artists.items[0].external_urls.spotify)
                msg.channel.sendMessage('Résultats  probant numéro 2 pour la recherche artiste ' + data.body.artists.items[1].external_urls.spotify)
                msg.channel.sendMessage('Résultats  probant numéro 3 pour la recherche artiste ' + data.body.artists.items[2].external_urls.spotify)
              })
            } else if (msg.content.match(/!spotify album.*/)) {
              var disque = msg.content.substring(15)
              spotifyWebApiNode.searchAlbums(disque)
              .then(function (data) {
                msg.channel.sendMessage('Résultats  probant numéro 1 pour la recherche album ' + data.body.albums.items[0].external_urls.spotify)
                msg.channel.sendMessage('Résultats  probant numéro 2 pour la recherche album ' + data.body.albums.items[1].external_urls.spotify)
                msg.channel.sendMessage('Résultats  probant numéro 3 pour la recherche album ' + data.body.albums.items[2].external_urls.spotify)
              })
            }
          })
})

client.login(config.token)
