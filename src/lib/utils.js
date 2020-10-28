

module.exports =  {

        formatPriceComingFromDb(price){
            //console.log(price)
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
                format: `${day}/${month}/${year}`
           }

        },
}