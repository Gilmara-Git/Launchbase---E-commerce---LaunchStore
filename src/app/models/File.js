const db = require('../../config/db')
const fs = require("fs");

module.exports = {

    create({filename, path, product_id}){
       
        const query = `        
                    INSERT INTO files (
                        name,
                        path,
                        product_id
        
                        ) VALUES ( $1, $2, $3)
                        RETURNING id
        `


        const values = [

                    filename,
                    path,
                    product_id
        ]

        
        return db.query(query, values)
    },

   async delete(id) {

        try {

        const result = await db.query (`SELECT path FROM files WHERE id = $1`, [id])
        const file = result.rows[0]
        //console.log(file)
        fs.unlinkSync(file.path);

        // this deletes from dabatase. The logic above deletes from public/images - unlinkSync
        return db.query(`

                    DELETE from files WHERE id=$1`, [id]       
        )
            
        } catch (error) {

            console.error(error)
            
        }        
    }

}
