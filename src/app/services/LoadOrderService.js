const Product =  require("../models/Product")
const { date, formatPriceComingFromDb } = require('../../lib/utils')


async function format(order){   

try {
   

   return 
}catch(error){
    console.error(error)
}

}

// este arquivoLoadProductService sera responsavel por fazer toda a juncao todas as repeticoes de
// procura uma order e formatar um produto.


const LoadService = {
    
    load(service, filter){
        this.filter = filter
        //console.log('linha 43',this.filter)
        return this[service]()// aqui dentro do this vamos retornar o service que o cara quiser(como abaixo, As funcoes: 1 produto, muitos produtos)
    }, 
    async order(){
        try{
            
        }catch(error){
            console.error(error)
        }

    },
    async orders(){
        //console.log('linha 56 loadService', this.filter)

        try{

            

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