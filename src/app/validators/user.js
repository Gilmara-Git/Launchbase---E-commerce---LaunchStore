const User = require('../models/User')

async function post(req, res, next){
    
    const keys = Object.keys(req.body)
    for( let key of keys){
        
        if(req.body[key]=="") return res.render('user/register',{
            user: req.body,
            error: "Por favor preencha todos os campos."
        })
        //console.log('linha 15',key)
        //console.log('linha160', req.body[key])
    }

    //check if user exists [email, cpf_cnpj] - email and cpf_cnpj sao UNIQUE
    let { email, cpf_cnpj, password, passwordRepeat} = req.body;
    cpf_cnpj = cpf_cnpj.replace(/\D/g, "") // retirando pontos e traco

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


module.exports = {

    post
}