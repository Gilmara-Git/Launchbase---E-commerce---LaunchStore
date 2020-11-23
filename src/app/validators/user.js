const User = require('../models/User')

async function post(req, res, next){
    
    const keys = Object.keys(req.body)
    for( let key of keys){
        if(req.body[key]=="") return res.send('Please fill out all fields!')
        //console.log('linha 15',key)
        //console.log('linha160', req.body[key])
    }

    //check if user exists [email, cpf_cnpj] - email and cpf_cnpj sao UNIQUE
    let { email, cpf_cnpj, password, passwordRepeat} = req.body;
    cpf_cnpj = cpf_cnpj.replace(/\D/g, "") // retirando pontos e traco

    const user = await User.findOne({
        where: {email}, or: {cpf_cnpj}}) //Passando um filtro em formato de objeto

    if(user) return res.send('User already exists.')

    // check if password match
    
    if(password != passwordRepeat){

        return res.send('Password Mismatch.')
    }
    
        

        next()
}


module.exports = {

    post
}