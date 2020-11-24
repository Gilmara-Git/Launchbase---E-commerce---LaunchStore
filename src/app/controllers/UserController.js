const User = require('../models/User')
const { formatCep, formatCpfCnpj } = require('../../lib/utils')

module.exports = {

    registerForm(req, res) {

       return  res.render('user/register')
     }, 

     async post(req, res){

      const userId = await User.create(req.body)
      
      // After configuring express-session and connect-pg-simple  - req.session is available 
      // E vamos entao adicionar o userId em no session para usarmos em nossa aplicacao
      req.session.userId = userId;
      //console.log('Novo usuario', userId)
      return res.redirect('/users')
     }, 

     async show(req, res){

      const { userId: id } = req.session
      const user =  await User.findOne({ where: {id} })
      console.log('linha 26 ', user)
      

      if(!user) return res.render('user/register',{

          error: 'Usuário não encontrado!'
      })
      
      user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
      user.cep = formatCep(user.cep)

      return res.render("user/index",  { user })
     }


}