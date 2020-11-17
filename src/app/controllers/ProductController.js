const Category = require("../models/Category")
const Product =  require("../models/Product")
const File = require("../models/File")
const {formatPriceComingFromDb, date} = require("../../lib/utils")


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
        
        if (req.files.length == 0 )   return res.send('Please, send at least one image')
        console.log(req.files)
       

        let results = await Product.create(req.body) // on the creating it will return an "id"       
        const productId = results.rows[0].id
        
        const filesPromise = req.files.map(file => File.create({ 
            ...file, 
            product_id: productId,
            path: `${file.path.replace(/\\/g, "/")}`
                       
        }))
        //console.log(filesPromise)    
        await Promise.all(filesPromise)
        
        return res.redirect(`products/${productId}`)
    },

    async show(req, res) {

        const { id } = req.params

        let results = await Product.find(id)
        const product = results.rows[0];

        if(!product) return res.send('Product not found!')

        const { day, month, hour, minutes} = date(product.updated_at)
        
        //here we are creating an object to send to Front-end ( In te Front-end it wil be product.day and product.hour)
        product.published = {            
            day: `${day}/${month}`,
            hour: `${hour}h:${minutes}m`
        }
        
        product.old_price = formatPriceComingFromDb(product.old_price);
        product.price = formatPriceComingFromDb(product.price);
        
        results = await Product.files(product.id)  
        let files = results.rows.map(file => ({

                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        })  )
        
    
       return res.render('products/show', {product, files})

    },

    async edit(req, res){
                    
        let results = await Product.find(req.params.id) 
        const product = results.rows[0]
        
            if(!product) return res.send ("Product not found!")

        product.price = formatPriceComingFromDb(product.price)    
        product.old_price = formatPriceComingFromDb(product.old_price)

        //get categories
        results = await Category.all()   
        const categories = results.rows
        
        //get images-files
        results = await Product.files(product.id)
        //console.log(results)
        let files = results.rows;
        // setting the right address for the image (public\\images\\1603810102967-liveIncrivel.png')
        files = files.map(file => 
            ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))

            //console.log(files)
        return res.render("products/edit.njk", { product, categories, files})

        
    }, 
    
    async put(req, res) {    
    const keys =  Object.keys(req.body)
        //console.log(req.body)
        for (let key of keys){
            if(req.body[key]=="" && key != "removed_files") {
                return res.send("Please fill out all fields!")
             }     
            }
        
             
            if(req.files.length != 0){

                const newFilesPromise = req.files.map(file => 
                    File.create({
                        ...file,
                        product_id: req.body.id,
                    }))
                await Promise.all(newFilesPromise)
            }

            if(req.body.removed_files){
                //42, 41 -> [42, 41,] Como tem a virgula a ultima posicao esta vaziz
                const removedFiles =  req.body.removed_files.split(",");
                const lastIndex =  removedFiles.length -1; 
                removedFiles.splice(lastIndex, 1) //[42,41]

                const removedFilesPromise = removedFiles.map(id => File.delete(id))

                await Promise.all(removedFilesPromise)

                }
            

            req.body.old_price = req.body.old_price.replace(/\D/g, "")
            req.body.price = req.body.price.replace(/\D/g, "")

            if(req.body.old_price !== req.body.price) {
                const previousPrice = await Product.find(req.body.id)
                req.body.old_price = previousPrice.rows[0].price
            }

            await Product.update(req.body)

            return res.redirect(`/products/${req.body.id}`)

    

    }, 

    async delete(req, res) {

       console.log(' linha 165 no banco de dados', req.body.id)  
        try {

            await Product.delete(req.body.id)

            return res.redirect("/products/create")

        } catch (error) {
            console.error(error)
        }

       
    }

}