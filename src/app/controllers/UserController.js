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

      const { user } = req; // this is coming from the Validator

      user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
      user.cep = formatCep(user.cep)

      return res.render("user/index",  { user })
     }, 

     async update(req, res){

      try{ 

        const { user } = req;
        let { name, email, cpf_cnpj, cep, address} =  req.body

        cpf_cnpj =  cpf_cnpj.replace(/\D/g, "")
        cep =  cep.replace(/\D/g, "")


        await User.update(user.id, {

          name,
          email,
          cpf_cnpj,
          cep,
          address
        })

        return res.render('user/index', {
          user: req.body,
          success: 'Conta atualizada com sucesso!'
        })
        
      } catch(error) {
        console.error(error)
        return res.render('user/index', { 
          
          error: "Algum erro aconteceu."

   })
      }
     }


}