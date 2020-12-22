

module.exports =  {

        formatPriceComingFromDb(price){
            
            return new Intl.NumberFormat("pt-BR", {
             style: "currency",
             currency: "BRL"             
         }).format(price/100) 
         
    
    },

        date(timestamp) {

            const date = new Date(timestamp)

            //yyyy vamos pegar o year
            const year = date.getFullYear()

            //yyyy vamos pegar o month - o month vem de 0 a 11  (0 = Janeiro e 11 = dezembro)
            const month = `0${date.getMonth() + 1}`.slice(-2)

            //yyyy vamos pegar o day - Datas vem de 1 a 31 
            const day = `0${date.getDate()}`.slice(-2)

            const hour = date.getHours();

            const minutes = date.getMinutes();

           return {
                
                day,
                month,
                year,
                hour,
                minutes,
                iso: `${year}-${month}-${day}`,
                birthday: `${day}/${month}`,
                format: `${day}/${month}/${year}`,
                
           }

        },

        formatCpfCnpj(value){
//            console.log(value)
            value = value.replace(/\D/g, "") // limpando tudo que nao e digito

            if(value.length > 14){

                value = value.slice(0,-1) // tirando a ultima posicao
            }

            //check if is cpf or cnpj (11.222.333/0001-88)
            if(value.length > 11){

                value = value.replace(/(\d{2})(\d)/, "$1.$2")
                value = value.replace(/(\d{3})(\d)/, "$1.$2")
                value = value.replace(/(\d{3})(\d)/, "$1/$2")
                value = value.replace(/(\d{4})(\d)/, "$1-$2")

                // could be this as well -- value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1.$2.$3/$4-")

            } else {
                // 033.145.685-99
                value = value.replace(/(\d{3})(\d)/, "$1.$2") 
                value = value.replace(/(\d{3})(\d)/, "$1.$2") 
                value = value.replace(/(\d{3})(\d)/, "$1-$2")    

            }
            return value
        },
        
        formatCep(value){
            //console.log(value)
            
            value = value.replace(/\D/g, "") // limpando tudo que nao e digito

            if(value.length > 8){

                value = value.slice(0, -1)
            }
            
            value = value.replace(/(\d{5})(\d)/, "$1-$2")
            return value


        }
    }