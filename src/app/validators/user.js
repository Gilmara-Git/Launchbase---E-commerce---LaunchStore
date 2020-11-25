const User = require('../models/User')
const { compare }  = require('bcryptjs') // Compare e para DESCRIPTOGRAFAR a senah


function checkAllFields(body){

    const keys = Object.keys(body)
        for(let key of keys){
            
            if(body[key]==""){
            return {
                user: body,
                error: "Por favor preencha todos os campos."
            }
            
        }
    }

}

async function post(req, res, next){

    const fillAllFieldsNeeded = checkAllFields(req.body)

        if (fillAllFieldsNeeded) {
            return res.render('user/register', fillAllFieldsNeeded)
        }
    
    //check if user exists [email, cpf_cnpj] - email and cpf_cnpj sao UNIQUE
    let { email, cpf_cnpj, password, passwordRepeat} = req.body;
    cpf_cnpj = cpf_cnpj.replace(/\D/g, "") // retirando pontos e traço

    const user = await User.findOne({
        where: {email}, or: {cpf_cnpj}}) //Passando um filtro em formato de objeto

    if(user) return res.render("user/register",  { // antes de chegar em users/register, ele passa pela layout e la vericamos se existe o erro ou nao.
        user: req.body,
        error: 'Usuário já cadastrado.'
    }
    )

    // check if password match
    
    if(password != passwordRepeat){

        return res.render('user/register', {

            user: req.body,
            error: "A senha e a repetição de senha não conferem."
        })
    }
    
        

        next()
}

async function show(req, res, next){

    const { userId: id } = req.session

    const user =  await User.findOne({ where: {id} })
    console.log('linha 26 ', user)
    
      if(!user) return res.render('user/register',{

        error: 'Usuário não encontrado!'

    })

    req.user = user

    next()
}

async function update(req, res, next){

    // check if has all fields
    const fillAllFieldsNeeded = checkAllFields(req.body)

        if (fillAllFieldsNeeded) {
            return res.render('user/index', fillAllFieldsNeeded)
        }

    // check if password has
    const { id, password } =  req.body
    if(!password) return res.render('user/index', {

        user: req.body,
        error: 'Coloque sua senha para atualizar seu cadastro.'
    })

    const user = await User.findOne({where: {id} })

    //check if password match
    passwordMatch = await compare(password, user.password) // Descriptografando a senha.

    if(!passwordMatch) return res.render('user/index', {
        user: req.body,
        error: 'Senha incorreta'
    })

    req.user = user

    next()
}

module.exports = {

    post,
    show, 
    update
}