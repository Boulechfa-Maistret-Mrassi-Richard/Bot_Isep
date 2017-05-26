// je suis Alexandre
// je suis Anis le bg du gang le bg
const httpClient = require('node-rest-client-promise').Client()
const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var translate = require('@google-cloud/translate')({
  key: 'AIzaSyDMVnVtOABpSFj_P3BT8CmlBep2uDaZloQ'
})

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
    httpClient.getPromise(urlmeteo)
    .then(res => {
      // msg.channel.sendMessage(res)
      // console.log(res.response.statusCode)
    })
    .catch(err => {
      console.log(err)
      throw err
    })
    // console.log(urlmeteo.weather.description)
    /* var request = require('request')
    var openweathermeteo = function (latitude, longitude, callback) {
      var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + latitude + '&lon=' + longitude + '&cnt=14&mode=json&units=metric&lang=fr'
      request(url, function (err, response, body) {
        try {
          var result = JSON.parse(body)
          var previsions = {
            temperature: result.list[1].temp.day,
            city: result.city.name
          }
          callback(null, previsions)
        } catch (e) {
          callback(e)
        }
      })
    }

    openweathermeteo(48.869777, 2.308186, function (err, previsions) {
      if (err) return console.log(err)
      console.log('A ' + previsions.city + ', la température est de ' + previsions.temperature + '°C')
    }) */
  }
})

client.login(config.token)
