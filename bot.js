// je suis Alexandre
// je suis Anis le bg du gang le bg
const httpClient = require('node-rest-client-promise').Client()
const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var translate = require('@google-cloud/translate')({
  key: 'AIzaSyDMVnVtOABpSFj_P3BT8CmlBep2uDaZloQ'
})
var Youtube = require('youtube-node')
var youtube = new Youtube()
youtube.setKey('AIzaSyAJTJfBHFK9CSXVJDO0T2ZIJGrE0s69sf0')
var Deezer = require('deezer-node-api')
var dz = new Deezer()

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
  }

  if (msg.content.match(/!translate.*/)) {
    var contenu = msg.content
    var langue = msg.content.substring(11, 13)
    translate.translate(contenu.substring(13), langue, function (err, translation) {
      if (!err) {
        msg.channel.sendMessage(translation)
      } else {
        console.log(err)
      }
    })
  }

  if (msg.content.match(/!weather.*/)) {
    var ville = msg.content.substring(9)
    var urlmeteo = 'http://api.openweathermap.org/data/2.5/weather?q=' + ville + '&APPID=3054b2798248ff002957afc8655a64db'
    httpClient.getPromise(urlmeteo, function (result, error) {
      if (result) {
        // console.log(result)
        msg.channel.sendMessage('A ' + JSON.stringify(result.name, null, 2) + ', il fait ' + Math.round(JSON.stringify(result.main.temp, null, 2) - 273.15) + ' degrès, et la météo est ' + JSON.stringify(result.weather[0].description, null, 2))
      } else {
        console.log(error)
      }
    })
  }

  if (msg.content.match(/!forecast.*/)) {
    var villeforecast = msg.content.substring(10)
    var urlmeteoforecast = 'http://api.openweathermap.org/data/2.5/forecast?q=' + villeforecast + '&mode=json&APPID=3054b2798248ff002957afc8655a64db'
    httpClient.getPromise(urlmeteoforecast, function (result, error) {
      if (result) {
        console.log(result)
        msg.channel.sendMessage('A ' + JSON.stringify(result.city.name, null, 2))
        msg.channel.sendMessage('Aujourd hui, il fait ' + Math.round(JSON.stringify(result.list[0].main.temp, null, 2) - 273.15) + ' degrès, et la météo est ' + JSON.stringify(result.list[0].weather[0].description, null, 2))
        msg.channel.sendMessage('J + 1, il fait ' + Math.round(JSON.stringify(result.list[8].main.temp, null, 2) - 273.15) + ' degrès, et la météo est ' + JSON.stringify(result.list[8].weather[0].description, null, 2))
        msg.channel.sendMessage('J + 2, il fait ' + Math.round(JSON.stringify(result.list[16].main.temp, null, 2) - 273.15) + ' degrès, et la météo est ' + JSON.stringify(result.list[16].weather[0].description, null, 2))
        msg.channel.sendMessage('J + 3, il fait ' + Math.round(JSON.stringify(result.list[24].main.temp, null, 2) - 273.15) + ' degrès, et la météo est ' + JSON.stringify(result.list[24].weather[0].description, null, 2))
        msg.channel.sendMessage('J + 4, il fait ' + Math.round(JSON.stringify(result.list[32].main.temp, null, 2) - 273.15) + ' degrès, et la météo est ' + JSON.stringify(result.list[32].weather[0].description, null, 2))
      } else {
        console.log(error)
      }
    })
  }

  if (msg.content.match(/!youtube.*/)) {
    var titre = msg.content.substring(9)
    var i = 0
    var j = 0
    youtube.search(titre, 5, function (error, result) {
      if (error) {
        console.log(error)
      } else {
        // console.log(JSON.stringify(result, null, 2))
        while (i < 3) {
          if (JSON.stringify(result.items[j].id.kind, null, 2).match(/video/)) {
            var lien = ', "lien : https://www.youtube.com/watch?v=' + JSON.stringify(result.items[j].id.videoId, null, 2).substring(1)
            msg.channel.sendMessage('Vidéo ' + (i + 1) + ' : ' + JSON.stringify(result.items[j].snippet.title, null, 2) + lien)
            i = i + 1
          }
          j = j + 1
        }
      }
    })
  }

  if (msg.content.match(/!deezer.*/)) {
    var recherchedeezer = msg.content.substring(8)
    var k = 0
    dz.findTracks(recherchedeezer).then(function (result) {
      msg.channel.sendMessage('Les trois morceaux correspondants sont :')
      while (k < 3) {
        msg.channel.sendMessage('Morceau ' + (k + 1) + ' : ' + JSON.stringify(result.data[k].title, null, 2) + ', lien :' + JSON.stringify(result.data[k].link, null, 2) + ' .')
        k = k + 1
      }
    })
  }
})

client.login(config.token)
