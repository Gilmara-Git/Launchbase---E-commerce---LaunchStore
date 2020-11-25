module.exports = {

logout(req, res){ // logout does not need async
   req.session.destroy() //Quando usuario clicar em SAIR no menu de Minha conta, sessao sera destruida e usuario redirecionado

   return res.redirect('/')
}
}