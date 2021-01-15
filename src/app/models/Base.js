// A BASE tera os metodos padroes e os outros irao herdar daqui
const db = require("../../config/db");

// precisamos passar a table aqui para dentro pq o this so funciona dentro do Base
// esta function find nao e exposta ao mundo la fora. Ela somente esta no universo do Base

function find(filters, table){
    try {
        let query = `SELECT * FROM ${table}`

        if(filters) { // tera alguns find.all( que nao terao filters)
        Object.keys(filters).map((key) => {
          // cada key WHERE | OR | id
          query += ` ${key}`;
  
          Object.keys(filters[key]).map((field) => {
              //name = value
            query += ` ${field} = '${filters[key][field]}'`;
          });
        });
      }

        return db.query(query);
      
      } catch (err) {

        console.error(err);
      }

}

const Base = {
  init({ table }) {
    if (!table) throw new Error("Invalid Params");
    this.table = table;
    return this;
    // 'this' e o objeto 'Base'
  },

  async find(id) {
 
    const results = await find({where: {id}}, this.table);
    return results.rows[0];
 
},

  async findOne(filters) {
   
      const results = await find(filters, this.table);
      
      return results.rows[0];
   
  },
  async findAll(filters) {
 
    const results = await find(filters, this.table);
    return results.rows;
 
},
  async create(fields) {

    //console.log('fields para criar order', fields)
    
    try {
      // keys name, email, password
      // values 'Gilmara', etc
      let keys = [],
        values = []

     

      Object.keys(fields).map((key) => {
        keys.push(key)
        values.push(`'${fields[key]}'`)
       
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
