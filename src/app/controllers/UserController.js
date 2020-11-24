const User = require('../models/User')

module.exports = {

    registerForm(req, res) {

       return  res.render('user/register')
     }, 

     async post(req, res){

      const userId = await User.create(req.body)
      
      // After configurin express-session and connect-pg-simple  - req.session is available 
      // E vamos entao adicionar o userId em no session para usarmos em nossa aplicacao
      req.session.userId = userId;


      return res.redirect('/users')
     }, 

     show(req, res){

      return res.send("Cheguei aqui")
     }


}