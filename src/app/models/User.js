const Base = require('./Base')

// iniciando o Base com a tabela 'users'
Base.init({ table: 'users'})

module.exports = {

  ...Base, // User esta herdando do Base

}



