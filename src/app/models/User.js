const db = require('../../config/db')
const { hash } = require('bcryptjs')

module.exports =  {

async findOne(filters){

    try {

    let query = `SELECT * FROM users`

    Object.keys(filters).map(key=>{
        // cada key WHERE | OR | id
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

    } catch(err){
        console.error(err)
    }

},

async create(data){

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
`

// password hash ( download npm install bcryptjs ) 
        const passwordHash = await hash(data.password, 8);  // hash is a promise ( needs await) - 8 é a força do Hash


        const values = [ 

            data.name,
            data.email, 
            passwordHash,
            data.cpf_cnpj.replace(/\D/g, ""),
            data.cep.replace(/\D/g, ""),
            data.address
        
        ]

        const results =  await db.query(query, values)
        return results.rows[0].id
            }catch(err) {
                console.error(err)
            }
            }

}