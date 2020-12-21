const Base = require('./Base')

Base.init({table: 'files'})

// const db = require('../../config/db')
// const fs = require("fs");

module.exports = {

    ...Base,

}

  //    async delete(id) {

//         try {

//         const result = await db.query (`SELECT path FROM files WHERE id = $1`, [id])
//         const file = result.rows[0]
//         //console.log(file)
//         fs.unlinkSync(file.path);

//         // this deletes from dabatase. The logic above deletes from public/images - unlinkSync
//         return db.query(`

//                     DELETE from files WHERE id=$1`, [id]       
//         )
            
//         } catch (error) {

//             console.error(error)
            
//         }        
//     }


