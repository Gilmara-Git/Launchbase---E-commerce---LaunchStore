// modulo do node - crypto  - para criar o token de recuperacao de senha 
const crypto = require('crypto')
const User = require('../models/User')


module.exports = {

logout(req, res){ // logout does not need async
   req.session.destroy() //Quando usuario clicar em SAIR no menu de Minha conta, sessao sera destruida e usuario redirecionado

   return res.redirect('/')
}, 
loginForm(req, res){

   return res.render('session/login')
}, 

login(req, res) {
   //colocar o usuario no req.session
   req.session.userId = req.user.id
   return res.redirect('/users')

},

forgotForm(req, res){

   return res.render('session/forgot-password')

},

forgot(req, res ){
   const user = req.user;
// um token para esse usuario de
   const token = crypto.randomBytes(20).toString("hex")
   console.log('este e o token criado com randomBytes  - tamanho 20:',token)
// criar uma expiracao para o token 
   let now = new Date()
   now.setHours(now.getHours() + 1) // token expirara em 1 hora

   await User.update(user.id, {
      
      reset_token: token,
      reset_token_expires: now
   
   }  )


   }
// enviar um email com um link de recuperacao de senha 



// avisar o usuario que enviamos o email



}
