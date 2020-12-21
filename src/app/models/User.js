const Base = require('./Base')

// iniciando o Base com a tabela 'users'
Base.init({ table: 'users'})

module.exports = {

  ...Base, // User esta herdando do Base

}




//   async create(data) {
//     try {
//       const query = `
//         INSERT INTO users (
//             name,
//             email, 
//             password,
//             cpf_cnpj,
//             cep,
//             address              
//             )VALUES ($1, $2, $3, $4, $5, $6)
//             RETURNING id
// `;

//       // password hash ( download npm install bcryptjs )
//       const passwordHash = await hash(data.password, 8); // hash is a promise ( needs await) - 8 é a força do Hash

//       const values = [
//         data.name,
//         data.email,
//         passwordHash,
//         data.cpf_cnpj.replace(/\D/g, ""),
//         data.cep.replace(/\D/g, ""),
//         data.address,
//       ];

//       const results = await db.query(query, values);
//       return results.rows[0].id;
//     } catch (err) {
//       console.error(err);
//     }
//   },
