var axios = require('axios')

module.exports = {
  getName:function(name){
    return axios.get(`https://alexa-remember-bot.herokuapp.com/${name}`)
  }
}
