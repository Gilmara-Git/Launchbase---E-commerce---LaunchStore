const Cart = require('../../lib/cart')
const LoadProductsService = require('../services/LoadProductService')

module.exports = {
 async index(req, res) {

    try{

        const product = await LoadProductsService.load('product', {where: { id: 1 }})
        let { cart } = req.session // ainda nao existe o carrinho no req.session
        // gerenciador de carrinho  cart = require("../../lib/cart")
        cart = Cart.init(cart).addOne(product) // como ainda nao existe carrinho, ele vai retornar aquela estrutura de carrinho items = [], total
        
      
         return res.render('cart/index', { cart })

    }catch(error){
        console.log(error)
    }


    
}
}
