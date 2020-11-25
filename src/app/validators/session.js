const User = require('../models/User')
const { compare }  = require('bcryptjs') // Compare e para DESCRIPTOGRAFAR a senah


async function login(req, res, next){

    const { email, password } = req.body

    //verificar se o usuario esta cadastrado 
    const user =  await User.findOne({ where: {email} }) 
        
      if(!user) return res.render('session/login',{
        user: req.body,
        error: 'Usuário não cadastrado!'

    })
//check if password match
    const passwordMatch = await compare(password, user.password) // Descriptografando a senha.

    if(!passwordMatch) return res.render('session/login', {
        user: req.body,
        error: 'Senha incorreta'
    })

    
    req.user = user

    next()
}


module.exports = {
    login
}





   


   
   
