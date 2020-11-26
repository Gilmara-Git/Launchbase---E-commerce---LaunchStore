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

async function forgot(req, res, next){

    const { email } = req.body

    try{

        const user = await User.findOne( { where: {email}})

        if(!user) return res.render('session/forgot-password', { 
            
            user: req.body,
            error : 'Email não cadastrado.'})

            req.user = user


            next()

    }catch(err){

        console.error(err)
    }
}


module.exports = {
    login,
    forgot
}





   


   
   
