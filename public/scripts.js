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

       
const PhotosUpload = {
    input: "",
    uploadLimit : 6,
    preview: document.querySelector('#photos-preview'),
    files: [],


    handleFileInput(event) {   
             
        const { files: fileList } = event.target;  // We could extract the file: fileList from input as well. Target is the input
             //console.log(fileList) console.log(event.target)
        // As fileList is a list, we needed to transform it in a array
        PhotosUpload.input = event.target;

        if(PhotosUpload.hasLimit(event)) return 

        Array.from(fileList).forEach(file =>{

            PhotosUpload.files.push(file); // this is not the fileList yet,

            const reader = new FileReader();

            reader.onload = ()=>{

              const image = new Image() // this is the same as create <img/> on html
              image.src = String(reader.result);
              //console.log(reader.result) FileReader creates file in the format of BLOB ( text type)
              
              const div = PhotosUpload.getContainer(image)
              
              PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file) // After file has been read, function reader.onload will be executed. img.src  is gettin the reader.result
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles(); // replace the browser fileList with the getAllFiles
        console.log(event.target.files)
    }, 

    hasLimit(event) {

        const { uploadLimit, input, preview } = PhotosUpload;
        const { files: fileList} = input
           // We could get the fileList as event.target.files as well
        //console.log(event.target.files)
        
        if(fileList.length > uploadLimit) {  
                       
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault(); 
            return true;
        }

        const photosDiv = [];
        preview.childNodes.forEach(item =>{
            if(item.classList && item.classList.value == "photo")
                photosDiv.push(item)
            
        })

        const totalPhotos = fileList.length + photosDiv.length; 
        // console.log(`file list ${fileList.length}`)
        // console.log(`photos div ${photosDiv.length}`)
        // console.log(`total photos ${totalPhotos}`)
            if(totalPhotos > uploadLimit) {
                alert("Você atingiu o limite máximo de fotos")
                event.preventDefault();
                return true; 
            }

            return false;
    },

    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();
        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        //console.log(dataTransfer) // On the dataTransfer we have a Files of the type Filelist // now we can work use this to replace the browser filelist 
        // But on firefox we need to user ClipboardEvent
        //Chrome - DataTransfer  files:Filelist
        return dataTransfer.files


    }, 

    getContainer(image){

            const div =  document.createElement('div')
            div.classList.add('photo')
            div.onclick = PhotosUpload.removePhoto; 
            div.appendChild(image)
            div.appendChild(PhotosUpload.getRemoveButton());
            return div

    },

    getRemoveButton(){

        const button = document.createElement('i'); // <div class="photo"/>
        button.classList.add('material-icons');
        button.innerHTML = 'delete_forever';
        return button;
        
    },

    removePhoto(event) { 
    
        const photoDiv = event.target.parentNode;
        //console.log(photoDiv)
        //console.log(event.target)
        const photosArray = Array.from(PhotosUpload.preview.children);
        //console.log(photosArray)
        const index = photosArray.indexOf(photoDiv)
        PhotosUpload.files.splice(index, 1);

        PhotosUpload.input.files = PhotosUpload.getAllFiles();

        photoDiv.remove(); 
        
    }, 

    removeOldPhoto(event){

        const photoDiv = event.target.parentNode;
        
        if(photoDiv.id){

            const removedFiles = document.querySelector('input[name="removed_files"');

            if (removedFiles) { // photos on dataBase

                removedFiles.value += `${photoDiv.id},` // 1, 3, 4, Later it will be an array (.split)
            }       
        }
        photoDiv.remove(); // photos on FrontEnd
    }
}

// On the input  = document.querySelect("#photos-input")
// input.files = will show the pictures uploaded, but if we delete them form the FRONT end.  It does not delete from the fileList.
// There is no way to work with the fileList because we can only read files.
// we are going to bring this fileList into and array  files = [ ] and pass a DataTransfer constructor to it. 

