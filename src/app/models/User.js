const db = require('../../config/db')

module.exports =  {

async findOne(filters){
let query = `SELECT * FROM users`

    Object.keys(filters).map(key=>{
        // cada key WHERE | OR
        query = `${query}
        ${key}`


        Object.keys(filters[key]).map(field =>{
            console.log('linha 15 banco de dados USER',field)
    
            query = `${query} ${field} = '${filters[key][field]}'`
    })
    
    })

console.log('linha 20', query)

    const results =  await db.query(query)
    return results.rows[0]
}

}