const API_KEY = "*****"

const submitIcon = document.querySelector("#submit-icon")
const input = document.querySelector("#input-content")
const imagesSection = document.querySelector('.images-sections')

const getImages = async () => {
    //clear imagesSections every time we call the function
    imagesSection.innerHTML = '';
    //HTTP POST METHOD
    const options = {
        method: "POST",
        headers:{
            "Authorization" : `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "prompt": input.value,
            "n":4,
            "size": "1024x1024"
        })
    }
    try{
        
       const response = await fetch('https://api.openai.com/v1/images/generations', options)
       const data = await response.json()
       console.log(data)

       data?.data.forEach(image => {
        const imagesContainer = document.createElement("div")
        imagesContainer.classList.add("image-container")
        const imageElement = document.createElement("img")
        imageElement.setAttribute("src", image.url)
        imagesContainer.append(imageElement)
        imagesSection.append(imagesContainer)
       });

    }catch(error){
        console.error(error)
    }
}

//if press submit icon do getImages functions
submitIcon.addEventListener('click', getImages)

//if press enter do getImages functions
input.addEventListener('keypress', (event)=>{
    if(event.key == 'Enter'){
        getImages()
    }
})

