// senao tiver userId na sessao , usuario nao esta logado. 
//Entao na rota de production vamos interceptar com este Middleware
function onlyUsers(req, res, next){
    if(!req.session.userId) 
    return res.redirect('/users/login')

    next()
}

module.exports = {

    onlyUsers
}