const LoadProductService = require("../services/LoadProductService");
const LoadOrderService = require("../services/LoadOrderService");

const User = require('../models/User');
const Order = require('../models/Order');
const mailer = require("../../lib/mailer");
const Cart = require("../../lib/cart");



const email = (seller, product, buyer) => `

    <h2>Olá ${seller.name}</h2>
    <p>Você tem um novo pedido de compra do seu produto.</p>
    <p>Produto: ${product.name}</p>
    <p>Preço: ${product.formattedPrice}</p>
    <p><br/><br/></p>
    <h3>Dados do comprador</h3>
    <p>${buyer.name}</p>
    <p>${buyer.email}</p>
    <p>${buyer.address}</p>
    <p>${buyer.cep}</p>
    <p><br/><br/></p>
    <p><strong>Entre em contato com o comprador para finalizar a venda!</strong></p>
    <p><br/><br/></p>
    <p>Atenciosamente, Equipe Launchstore</p>

`


module.exports = {
  async index(req, res) {

    const orders = await LoadOrderService.load('orders', { where: 
      { buyer_id: req.session.userId}})
    return res.render('orders/index', { orders })
  },
  async post(req, res) {
    try {
      const cart = Cart.init(req.session.cart);

      const buyer_id = req.session.userId;
      //console.log('buyer', buyer_id)
      //impedir que o comprador compre algo que ele esta vendendo
      const filteredItems = cart.items.filter(
        (item) => item.product.user_id != buyer_id
      );

      //criar pedido  (**price no pedido** e o preco do produto - Se o preco do produto mudar temos o valor no pedido)
      const createOrdersPromise = filteredItems.map(async (item) => {
        let { product, price: total, quantity } = item;
        const { price, id: product_id, user_id: seller_id } = product;
        //console.log('seller',seller_id)
        const status = "open";

        const order = await Order.create({
          seller_id,
          buyer_id,
          product_id,
          price,
          quantity,
          total,
          status,
        });

        // pegar dados dos produtos
        product = await LoadProductService.load("product", {
          where: { id: product_id },
        });

        // pegar dados do vendedor
        const seller = await User.findOne({ where: { id: seller_id } });

        // pegar dados do comprador
        const buyer = await User.findOne({ where: { id: buyer_id } });

        //enviar email com dados da compra para o vendedor email
        await mailer.sendMail({
          to: seller.email,
          from: "no-reply@launchstore.com.br",
          subject: "Novo pedido de compra",
          html: email(seller, product, buyer),
        });

        return order;
      });

      await Promise.all(createOrdersPromise);

      // clear cart after order has been made, so cart will be not showing items anymore
      delete req.session.cart;
      Cart.init(); //nas duvidas passamos tambem o carrinho vazio

      // notificar o comprador/usuario com uma mensagem de sucesso ou error
      return res.render("orders/success");
    } catch (error) {
      console.error(error);
      return res.render("orders/error");
    }
  },
  async sales(req, res) {

    const sales = await LoadOrderService.load('orders', { where: 
      { seller_id: req.session.userId}})

      return res.render('orders/sales', { sales })
  },

  async show(req, res){
    
    const { id } = req.params;
   
    const order = await LoadOrderService.load('order', { where: { id }})
   
     return res.render('orders/details', { order })
  }
};
