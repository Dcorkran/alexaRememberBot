var axios = require('axios')

module.exports = {
  getName:function(name){
    axios.get(`http://localhost:3000/${name}`)
    .then((description)=>{
      return description;
    })
  }
}
