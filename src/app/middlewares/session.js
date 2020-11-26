// senao tiver userId na sessao , usuario nao esta logado. 
//Entao na rota de product/create vamos interceptar com este Middleware
function onlyUsers(req, res, next){
    //console.log(req.session)
    if(!req.session.userId) 
    return res.redirect('/users/login')

    next()
}


function isLoggedRedirectToUsers(req, res, next){
    if(req.session.userId){

        return res.redirect('/users')
    }

    next()
}

module.exports = {

    onlyUsers,
    isLoggedRedirectToUsers
}