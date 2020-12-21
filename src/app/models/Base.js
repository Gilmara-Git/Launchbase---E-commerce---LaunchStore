// A BASE tera os metodos padroes e os outros irao herdar daqui
const db = require("../../config/db");

const Base = {
  init({ table }) {
    if (!table) throw new Error("Invalid Params");
    this.table = table;
    return this;
    // 'this' e o objeto 'Base'
  },
  async findOne(filters) {
    try {
      let query = `SELECT * FROM ${this.table}`;

      Object.keys(filters).map((key) => {
        // cada key WHERE | OR | id
        query = `${query}
            ${key}`;

        Object.keys(filters[key]).map((field) => {
          query = `${query} ${field} = '${filters[key][field]}'`;
        });
      });

      const results = await db.query(query);
      return results.rows[0];
    } catch (err) {
      console.error(err);
    }
  },
  async create(fields) {
    // User.create( { o fields sera um objeto com chaves e valores})

    try {
      // keys name, email, password
      // values 'Gilmara', etc
      let keys = [],
        values = [];

      Object.keys(fields).map((key) => {
        keys.push(key)
        values.push(values)
      });

      const query = `INSERT INTO ${this.table}
                            (${keys.join(',')})
                            VALUES (${values.join(',')})
                            RETURNING id`;

      const results = await db.query(query);
      return results.rows[0].id;
    } catch (err) {
      console.error(err);
    }
  },
  update(id, fields) {

    try {

        let update = []

        Object.keys(fields).map(key => {

            //category_id = ($1)
            const line  = `${key} = '${fields[key]}'`            
            update.push(line)      
          });
          
          let query = `UPDATE ${this.table} SET
          ${update.join(',')}
          WHERE id=${id}`

          return db.query(query);
          
    }catch(error){

        console.error(error);
    }
    

    
  },

  delete(id) {
      
        return db.query(`DELETE FROM ${this.table} 
                        WHERE id=${id}`);
      
    }
};

module.exports = Base;
