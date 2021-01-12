const Cart = require('../../lib/cart')
const LoadProductsService = require('../services/LoadProductService')

module.exports = {
 async index(req, res) {

    try{

        let { cart } = req.session 
        // gerenciador de carrinho  cart = require("../../lib/cart")
        cart = Cart.init(cart) // aqui pegamos o carrinho da sessao e colocamos no init. Se nao tiver nada estara vazio
        
         return res.render('cart/index', { cart })

    }catch(error){
        console.log(error)
    }
    
}, 

    async addOne(req, res){
        //gerenciador de carrinho nao deixa adicionar uma quantidade de items/produto no carrinho maior do que product.quantity 

        try{

            // pegar o id do produto e o produto
            const { id } = req.params
            const product = await LoadProductsService.load('product', { where: { id }})
            //console.log('produto para o carriho', product)
            // pegar o carrinho da sessao
            let { cart } = req.session
            //console.log('carrinho', cart)

            // adicionar o produto ao carrinho (usando o gerenciador de carrinho)
            cart = Cart.init(cart).addOne(product)

            // atualizar o carrinho da Session
            req.session.cart = cart

            //redirecionar o usuario para a tela do carrinho
            return res.redirect('/cart')
            

        }catch(error){

            console.error(error)

        }

    }, 

    removeOne(req, res){

        let { id } = req.params

        let { cart } = req.session
        if(!cart) return res.redirect('/cart')

        cart = Cart.init(cart).removeOne(id)

        req.session.cart = cart

        return res.redirect('/cart')

    }, 

    delete(req, res) {
        
        let { id } = req.params
        let { cart } = req.session
        if(!cart) return

        req.session.cart = Cart.init(cart).delete(id)

        return res.redirect('/cart')

    }
}
