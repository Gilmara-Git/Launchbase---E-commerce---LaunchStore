const  { formatPriceComingFromDb } = require('./utils')

//cart will be store in session (req.session)/ Like when user is logged in
// we will call this cart withing session as oldCart


const Cart = { 

    init(oldCart){
         if(oldCart){
            this.items = oldCart.items  //criando todos os items do carrinho
            this.total = oldCart.total
         }else {
            this.items = []
            this.total = {

                quantity: 0,
                price: 0,
                formattedPrice: formatPriceComingFromDb(0) // isso que sera mostrado para o cliente
            }

         }
         return this
     },
    addOne(product){},

    removeOne(productId){}, // dentro o items ele vai procurar por productId

    delete(productId){}, // ele vai procurar no items e vai remover ele todiho do carrinho

     
}


module.exports = Cart

//console.log(Cart.init().total.formattedPrice)
//console.log(Cart.init({items: [ 1,2,3 ], total: {quantity: 50 }})) //quando o carrinho vier com items
// metodos para:

// - 22 + --------trash (clicando em trash elimina tudo do carrinho)
// Metodo 1 = Adicionar 1 item ao carrinho
// Metodo 2 = Remover 1 item do carrinho
// Metodo 3 = Deletar todo o item (trash)





