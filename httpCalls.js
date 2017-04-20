var axios = require('axios')

module.exports = {
  getName:function(name){
    console.log('hit');
    return axios.get(`https://alexa-remember-bot.herokuapp.com/${name}`)
  }
  // postName:function(name){
  //   return axios.post(`https://alexa-remember-bot.herokuapp.com/`,
  //   {
  //     name,
  //     description
  //   })
  // },

}
