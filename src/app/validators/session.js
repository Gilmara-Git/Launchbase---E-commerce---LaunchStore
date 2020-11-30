const User = require('../models/User')
const { compare }  = require('bcryptjs') // Compare e para DESCRIPTOGRAFAR a senah
const { date } = require('../../lib/utils')

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


async function reset(req, res, next) {
  try {

    const { email, password, passwordRepeat, token } = req.body;
    // procurar o usuario
    const user = await User.findOne({ where: {email}});
    if(!user) return res.render('session/password-reset', {
        user: req.body,
        token,
        error: "Usuário não encontrado!"
    })

    
    // ver se a senha bate
    if(password != passwordRepeat){
        return res.render('session/password-reset', {
            user: req.body,
            token,
            error: "A senha e a repetição de senha não conferem."
        })
    }
    // verificar se o token bate
   
    if(token != user.reset_token) return res.render('session/password-reset', {
            user:req.body,
            token,
            error: 'Token inválido, solicite uma nova recuperação de senha!'
        })

    // verificar se o token nao expirou
    let now = new Date();
    now = date(now.setHours(now.getHours()))
        console.log('hora de agora', date(now))
        console.log('hora do token do usuario', user.reset_token_expires)
    if(now > user.reset_token_expires) return res.render('session/password-reset', {
       user: req.body,
       token,
       error: 'Token expirado! Por favor, solicite uma nova recuperação de senha!'
    })

    req.user = user
    next()

  } catch (err) {

    console.error(err);
  }
  
}

module.exports = {
    login,
    forgot,
    reset
}





   


   
   
