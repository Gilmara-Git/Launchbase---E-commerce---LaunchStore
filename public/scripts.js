// input = document.querySelector('input[name="price"]') // Getting the input by its name and printing the keydown EVENT

// input.addEventListener("keydown", function(e){

//     setTimeout(()=>{

//         let { value } = e.target
//         value = value.replace(/\D/g, "") // ddg18023 will return 18023
//        console.log(value)
        
//         value = Intl.NumberFormat("en-US", {
//             style: "currency",// It will set the currency format (BRL 1,00)  or 1.00 (US dolar)
//             currency: "USD"   // R$ will be shown for Brazil or U$ for USA
//             // this will return an object . $  0,00
//         }).format(value/100) //This will get the value and do this. Ex 180.23  ( R$ 180,23)
        
//         e.target.value = value  // e.target.value is getting the new value only with DIGITS, 1 ms after value is typed
//     })

//     }, 1) 
    
//========================================================================================================================
    // We are going to use all the logic above in an OBJECT with some functionalities in it.
    // So, now I can use the MASK on different areas of the HTML and put the functions in here

    const Mask = {

        apply(input, func) {
            setTimeout(()=>{
                input.value = Mask[func](input.value) //the input will come from the HTML. Same thing with the function(here we only have formatBRL)

            }, 1)

        },

        formatUSA(value){
            value = value.replace(/\D/g, "")           
            // console.log("estou aqui no format")
            return value = Intl.NumberFormat("en-US", {
                 style: "currency",
                 currency: "USD"             
             }).format(value/100) 
             
        }
    }

       
