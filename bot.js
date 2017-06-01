const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var Twit = require('twit')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

var TwitterAccount = new Twit({
  consumer_key: 'WN1ECdQYYQxEW5oXSyVc0q1oY',
  consumer_secret: 'j1YZoMe2fIJ7w35CiN8Ebv70dh1rN8eh5bNPTeofFmkxlehcVR',
  access_token: '870358942123253760-DFyKbExm4Br8bJPkjIobRWzBodF57mq',
  access_token_secret: '0kQ5tsEnBlddRxrnVL6uYksz4ETyzdY8LWMO6H3K6C2pw'
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  }

  var post = msg.content
  post = post.substring(7)

  // L'utilisateur souhaite tweeter

  // Tweet vide -> non autorisé
  if (msg.content === '!tweet') {
    msg.channel.sendMessage('Votre tweet est vide')
  }

  // Tweet non vide ->  autorisé
  if (msg.content === '!tweet ' + post) {
    // Si tweet plus de 140 caractères, tweet refusé
    if (post.length > 140) {
      msg.channel.sendMessage('Votre tweet contient plus de 140 caractères. Envoi impossible.')
    } else {
      var tweet = {
        status: post
      }
      TwitterAccount.post('statuses/update', tweet, tweeted)
      /*eslint-disable */
      function tweeted(err, data, response) {
      /*eslint-enable*/
        if (err) {
          msg.channel.sendMessage('Tweet non envoyé. Une erreur est survenue.')
        } else {
          msg.channel.sendMessage('Tweet envoyé avec succès.')
        }
      }
    }
  }
})

client.login(config.token)
