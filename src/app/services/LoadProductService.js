const Product =  require("../models/Product")
const { date, formatPriceComingFromDb } = require('../../lib/utils')


async function getImages(productId) {
    let files = await Product.files(productId)
     files = files.map(file=> ({
         ...file,
         src: `${file.path.replace('public', '').replace(/\\/g, "/")}`
     }))
        
     return files
  }

async function format(product){   

    const files = await getImages(product.id)
    product.img  =  files[0].src
    product.files = files
    product.formattedOldPrice = formatPriceComingFromDb(product.old_price)
    product.formattedPrice = formatPriceComingFromDb(product.price)
    
    const { day, month, hour, minutes } = date(product.updated_at);

    //here we are creating an object to send to Front-end ( In te Front-end it wil be product.published.day and product.published.hour)
    product.published = {
      day: `${day}/${month}`,
      hour: `${hour}h:${minutes}m`,
    };

   return product

}

// este arquivoLoadProductService sera responsavel por fazer toda a juncao todas as repeticoes de
// procura um produto e formatar um produto.


const LoadService = {
    
    load(service, filter){
        this.filter = filter
        //console.log('linha 43',this.filter)
        return this[service]()// aqui dentro do this vamos retornar o service que o cara quiser(como abaixo, As funcoes: 1 produto, muitos produtos)
    }, 
    async product(){
        try{
            const product = await Product.findOne(this.filter)
            return format(product)
        }catch(error){
            console.error(error)
        }

    },
    async products(){
        console.log('linha 56', this.filter)

        try{

            const products = await Product.findAll(this.filter)
            const productsPromise = products.map(format)
            return Promise.all(productsPromise)

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