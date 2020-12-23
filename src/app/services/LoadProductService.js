const 

// este arquivoLoadProductService sera responsavel por fazer toda a juncao todas as repeticoes de
//procura um produto e formatar um produto.
const LoadService = {

    load(service, filter){
        this.filter = filter
        return this[service]() // aqui dentro do this vamos retornar o service que o cara quiser(como abaixo, As funcoes: 1 produto, muitos produtos)
    }, 
    product(){

    },
    products(){

    }    
}

//LoadService.load('product', { where: { id } }) // Estamos chamando a funcao product passando o filter

module.exports = LoadService