const Category = require("../models/Category")
const Product =  require("../models/Product")
const { formatPriceComingFromDb} = require("../../lib/utils")



module.exports = {

    create(req, res) { // Callbacks evolved into promises. Below is an initial example. We are going to wait for a return. Thereafter, we use .then

            Category.all().then(function(results){
                 
                const categories = results.rows
                return res.render("products/create.njk", {categories})

            }).catch(function(err){

                throw new Error(err)
            })

        },

    async post(req, res){ //here we are utilyzing async await instead of the (.then chain) like above

        const keys =  Object.keys(req.body)

        for (let key of keys){
            if(req.body[key]=="") return res.send("Please fill out all fields!")

        }

        let results = await Product.create(req.body) // on the creating it will return an "id"       
        const productId = results.rows[0].id
     
        return res.redirect(`products/${productId}`)
    },

    async edit(req, res){
                    
        let results = await Product.find(req.params.id) 
        const product = results.rows[0]
            if(!product) return res.send ("Product not found!")

        product.price = formatPriceComingFromDb(product.price)    
        product.old_price = formatPriceComingFromDb(product.old_price)

        results = await Category.all()   
        const categories = results.rows
        
        return res.render("products/edit.njk", { product, categories})

        
    }, 
    
    async put(req, res) {
        const keys =  Object.keys(req.body)
        //console.log(req.body)
        for (let key of keys){
            if(req.body[key]=="") return res.send("Please fill out all fields!")
           
            req.body.old_price = req.body.old_price.replace(/\D/g, "")
            req.body.price = req.body.price.replace(/\D/g, "")

            if(req.body.old_price !== req.body.price) {
                const previousPrice = await Product.find(req.body.id)
                req.body.old_price = previousPrice.rows[0].price
            }

            await Product.update(req.body)

            return res.redirect(`/products/${req.body.id}/edit`)

    }

    }, 

    async delete(req, res) {

        console.log(req.body.id)

        await Product.delete(req.body.id)

        return res.redirect("/products/create")
    }

}