const Category = require("../models/Category")
const Product =  require("../models/Product")
const File = require("../models/File")
const {formatPriceComingFromDb, date} = require("../../lib/utils")


module.exports = {
  async create(req, res) {
    try {
      const categories = await Category.findAll();
      return res.render("products/create", { categories });
    } catch (error) {
      console.error(error);
    }
  },

  async post(req, res) {
    try {
      const keys = Object.keys(req.body);

      for (let key of keys) {
        if (req.body[key] == "") return res.send("Please fill out all fields!");
      }

      if (req.files.length == 0)
        return res.send("Please, send at least one image");

      let {
        category_id,
        name,
        description,
        old_price,
        price,
        quantity,
        status,
      } = req.body;

      price = price.replace(/\D/g, "");

      const product_id = await Product.create({
        category_id,
        user_id: req.session.userId,
        name,
        description,
        old_price: old_price || price,
        price,
        quantity,
        status: status || 1,
      });

      console.log("Coisas que vem no req.files=", req.files);
      const filesPromise = req.files.map((file) =>
        File.create({
          ...file,
          product_id,
          path: `${file.path.replace(/\\/g, "/")}`,
        })
      );

      await Promise.all(filesPromise);

      return res.redirect(`products/${product_id}/edit`);
    } catch (error) {
      console.error(error);
    }
  },

  async show(req, res) {
    const { id } = req.params;

    try {
      const product = await Product.find(id);

      if (!product) return res.send("Product not found!");

      const { day, month, hour, minutes } = date(product.updated_at);

      //here we are creating an object to send to Front-end ( In te Front-end it wil be product.published.day and product.published.hour)
      product.published = {
        day: `${day}/${month}`,
        hour: `${hour}h:${minutes}m`,
      };

      product.old_price = formatPriceComingFromDb(product.old_price);
      product.price = formatPriceComingFromDb(product.price);

      let files = await Product.files(product.id);
      files = files.map((file) => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace(
          "public",
          ""
        )}`,
      }));

      return res.render("products/show", { product, files });
    } catch (error) {
      console.error(error);
    }
  },

  async edit(req, res) {
    try {
      const product = await Product.find(req.params.id);

      if (!product) return res.send("Product not found!");

      product.price = formatPriceComingFromDb(product.price);
      product.old_price = formatPriceComingFromDb(product.old_price);

      //get categories
      const categories = await Category.findAll();

      //get images-files
      let files = await Product.files(product.id);

      // setting the right address for the image (public\\images\\1603810102967-liveIncrivel.png')
      files = files.map((file) => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace(
          "public",
          ""
        )}`,
      }));

      //console.log(files)
      return res.render("products/edit.njk", { product, categories, files });
    } catch (error) {
      console.error(error);
    }
  },

  async put(req, res) {
    try {
      const keys = Object.keys(req.body);
      
      for (let key of keys) {
        if (req.body[key] == "" && key != "removed_files") {
          return res.send("Please fill out all fields!");
        }
      }

      if (req.files.length != 0) {
        const newFilesPromise = req.files.map((file) =>
          File.create({
            ...file,
            product_id: req.body.id,
          })
        );
        await Promise.all(newFilesPromise);
      }

      if (req.body.removed_files) {
        //42, 41 -> [42, 41,] Como tem a virgula a ultima posicao esta vaziz
        const removedFiles = req.body.removed_files.split(",");
        const lastIndex = removedFiles.length - 1;
        removedFiles.splice(lastIndex, 1); //[42,41]

        const removedFilesPromise = removedFiles.map((id) => File.delete(id));

        await Promise.all(removedFilesPromise);
      }

      req.body.old_price = req.body.old_price.replace(/\D/g, "");
      req.body.price = req.body.price.replace(/\D/g, "");

      if (req.body.old_price !== req.body.price) {
        const previousPrice = await Product.find(req.body.id);
        req.body.old_price = previousPrice.rows[0].price; 
        // aqui tera que troca para previousPrice.price, pq o find ja me retorna results.rows[0]
      }

      
      await Product.update(req.body.id, {

        category_id: req.body.category_id,
        name: req.body.name,
        description: req.body.description,
        old_price: req.body.old_price,
        price: req.body.price,
        quantity: req.body.quantity,
        status: req.body.status,

      });

      return res.redirect(`/products/${req.body.id}`);
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    
    try {
      await Product.delete(req.body.id);

      return res.redirect("/products/create");
    } catch (error) {
      console.error(error);
    }
  },
};