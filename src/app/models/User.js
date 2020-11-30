const db = require("../../config/db");
const { hash } = require("bcryptjs");
const Product = require("../models/Product");
const fs = require("fs");

module.exports = {
  async findOne(filters) {
    try {
      let query = `SELECT * FROM users`;

      Object.keys(filters).map((key) => {
        // cada key WHERE | OR | id
        query = `${query}
        ${key}`;

        Object.keys(filters[key]).map((field) => {
          //console.log('linha 19 banco de dados USER',field)

          query = `${query} ${field} = '${filters[key][field]}'`;
        });
      });

      //console.log('linha 26', query)

      const results = await db.query(query);
      return results.rows[0];
    } catch (err) {
      console.error(err);
    }
  },

  async create(data) {
    try {
      const query = `
        INSERT INTO users (
            name,
            email, 
            password,
            cpf_cnpj,
            cep,
            address              
            )VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
`;

      // password hash ( download npm install bcryptjs )
      const passwordHash = await hash(data.password, 8); // hash is a promise ( needs await) - 8 é a força do Hash

      const values = [
        data.name,
        data.email,
        passwordHash,
        data.cpf_cnpj.replace(/\D/g, ""),
        data.cep.replace(/\D/g, ""),
        data.address,
      ];

      const results = await db.query(query, values);
      return results.rows[0].id;
    } catch (err) {
      console.error(err);
    }
  },

  async update(id, fields) {
    let query = "UPDATE users SET";

    Object.keys(fields).map((key, index, array) => {
      if (index + 1 < array.length) {
        query = `${query}
            ${key} = '${fields[key]}',

            `;
      } else {
        // ultima iteracao do array nao tem virgula ao final
        query = `${query}
            ${key} = '${fields[key]}'
            WHERE id = ${id}
            `;
      }
    });
    //console.log('linha 96 db', query)
    await db.query(query);
    return;
  },

  async delete(id) {
    // pegar todos os products
    //console.log('id do usuario', id)
    let results = await db.query("SELECT * FROM products WHERE user_id = $1",[id] )
    const products = results.rows;

    // pegar todas as images
    const allFilesPromise = products.map(product =>  
      Product.files(product.id))
  
    let promiseResults = await Promise.all(allFilesPromise);


    //rodar a remocao do usuario (banco deletara produtos e arquivo (Cascade deletion))
    await db.query(`DELETE FROM users WHERE id = $1`, [id])
   
    // remover as images da pasta public
    promiseResults.map(results => {
      results.rows.map(file => {
        
        try{
            fs.unlinkSync(file.path)
        }catch(err){

            console.error(err)
        }
        
    })
})
  }
}


