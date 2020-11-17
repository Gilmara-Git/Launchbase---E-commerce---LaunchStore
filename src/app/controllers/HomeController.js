const Product =  require("../models/Product")
const File = require("../models/File")
const {formatPriceComingFromDb, date} = require("../../lib/utils")


module.exports = {

async index(req, res) {

   try {
   let results = await Product.all() 
   const products = results.rows 

   if(!products) return res.send("Products not found!")  

   async function getImage(productId){
       
        let results = await Product.files(productId) 
        // Aqui estamos retornando somente o 'path'
       
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '').replace(/\\/g, "/")}`)
    
             return files[0] // he we are returning just one image
   }
   
//    Para cada products usaremos a funcao getImage e para isso precisamos de usar uma cadeia de promessa
//    Note que como abaixo nao estamos desestruturando o objeto usamos '=' e nao ':' 
   const productsPromise = products.map(async product =>{
    product.img = await getImage(product.id)
    product.oldPrice = formatPriceComingFromDb(product.old_price)
    product.price = formatPriceComingFromDb(product.price)
    return product
   }).filter((product, index)=> index > 2 ? false: true) // only 3 products 0, 1 , 2, 3 are
   // Aqui estamos limitando o resultado de produtos para 2 produtos SOMENTE
   // ou seja quando passar de 2 produtos ja retorna falso para mim


    const lastAdded =  await Promise.all(productsPromise)
    //console.log('linha 38', lastAdded)

    return res.render('home/index', {products: lastAdded})

   }

   catch(err){
      console.error(err)
   }

}
}