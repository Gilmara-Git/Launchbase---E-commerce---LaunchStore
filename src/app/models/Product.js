const Base = require("./Base");


Base.init({ table: "products" });

module.exports = {
  ...Base,

  async files(id) {
    
    const results = await db.query(
      `                
        SELECT * FROM files where product_id = $1`,
      [id]
    );

    return results.rows
  },

  async search(params) {
    const { filter, category } = params;

    let query = "",
      filterQuery = `WHERE`;

    if (category) {
      //console.log('linha 124 banco de dados',category)
      filterQuery = `${filterQuery}
            products.category_id = ${category} 
            AND`;
    }

    filterQuery = `
            ${filterQuery}
            products.name ILIKE '%${filter}%'
            OR products.description ILIKE '%${filter}%'
        `;

    query = `
             SELECT products.*,
             categories.name AS category_name
             FROM products
             LEFT JOIN categories ON(categories.id = products.category_id)
             ${filterQuery} 
             GROUP BY products.id , categories.id
            
        `;

      const results  = await db.query(query);
        return results.rows
  },
};

// all(){

//     try {
//         return db.query(`
//                 SELECT * FROM products
//                 ORDER BY updated_at DESC // depois o maik vai tratar esta questao aqui
//         `)

//     } catch (error) {
//         console.error(error)
//     }

// },

// create(data){

//     const query =  `
//                     INSERT INTO products (
//                      category_id,
//                      user_id,
//                      name,
//                      description,
//                      old_price,
//                      price,
//                      quantity,
//                      status
//                     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//                     RETURNING id   `

//                     data.price = data.price.replace(/\D/g, "") // reg expression (keep only digits)

//     const values = [
//                     data.category_id,
//                     data.user_id,
//                     data.name,
//                     data.description,
//                     data.old_price || data.price,
//                     data.price,
//                     data.quantity,
//                     data.status || 1
//     ]

//     return db.query(query, values)
// },
