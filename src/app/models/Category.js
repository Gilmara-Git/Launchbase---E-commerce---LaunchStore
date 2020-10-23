const db = require("../../config/db")

module.exports = {

    all(){
        //this return is automatically a promise
        return db.query(` 
        
                            SELECT * FROM categories     `)
        
    }
    
}