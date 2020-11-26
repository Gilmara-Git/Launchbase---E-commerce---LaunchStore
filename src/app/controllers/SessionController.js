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


}
}