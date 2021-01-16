const Order =  require("../models/Order")
const User =  require("../models/User")
const LoadProductService = require('./LoadProductService')

const { date, formatPriceComingFromDb } = require('../../lib/utils')


async function format(order){  

    //detalhes do produto(ao inves de colocar no const , colocou direto no order)
      order.product = await LoadProductService.load("productWithDeleted", {
        where: { id: order.product_id },
      });

      //detalhes do comprador
      order.buyer = await User.findOne({ where: { id: order.buyer_id } });

      //detalhes do vendedor
      order.seller = await User.findOne({ where: { id: order.seller_id } });

      //formatacao de preco
      order.formattedPrice = formatPriceComingFromDb(order.price);
      order.formattedTotal = formatPriceComingFromDb(order.total);

      //formatacao do status

      const statuses = {
        open: "Aberto",
        sold: "Vendido",
        canceled: "Cancelado",
      };

      order.formattedStatus = statuses[order.status]; // order.status e um  field na tabela de pedido

      //formatacao de atualizado em...
      const updatedAt = date(order.updated_at);
      order.formattedUpdatedAt = `${order.formattedStatus} em ${updatedAt.day}/${updatedAt.month}/${updatedAt.year} as ${updatedAt.hour}h ${updatedAt.minutes}m`;
      return order;
    }

    




const LoadService = {
    
    load(service, filter){
        this.filter = filter
        //console.log('linha 43',this.filter)
        return this[service]()// aqui dentro do this vamos retornar o service que o cara quiser(como abaixo, As funcoes: 1 produto, muitos produtos)
    }, 
    async order(){
        try{

           const order = await Order.findOne(this.filter) 
           return format(order)
            
        }catch(error){
            console.error(error)
        }

    },
    async orders(){

    try{

    //pegar os pedidos do usuario
    const orders = await Order.findAll(this.filter);
    const ordersPromise = orders.map(format)   
    return Promise.all(ordersPromise )

        }catch(error){
            console.error(error)
        }

    },
    
    format // exportando para la para fora, por se acaso for preciso usar
    
}



//console.log(LoadService.load('products')) // Estamos chamando a funcao product passando o filter

module.exports =   LoadService 


// async function getProduct(){
//     const product = await Product.findAll()
//     console.log(product)    

// }
// console.log(getProduct())