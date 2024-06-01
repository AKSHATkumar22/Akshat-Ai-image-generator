const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");
const OPENAI_API_KEY = "sk-proj-sk-proj-oll2G9ZgBUFqXy1e0ymyT3BlbkFJ1uk1Lzd0BREWtfzsS1py";



const generateAiImages = async (userPrompt, userImageQuantity) => {
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: parseInt(userImageQuantity),
                size: "512x512",
                response_format: "b64_json",
            }),
        });


        if(!response.ok) throw new Error("Failed to fetch the data");


        const { data } = await response.json();
        console.log(data);

    } catch (error) {
        alert(error.message);
    }
}



const onhandleFormSubmission = (e) => {
        e.preventDefault();
        // console.log(e.srcElement);
        const userPrompt = e.srcElement[0].value;
        const userImageQuantity = e.srcElement[1].value;

        // console.log(userPrompt, userImageQuantity);
        const imgCardMarkUp = Array.from({length: userImageQuantity}, () => 
        `
        <div class="img-card loading">
        <img src="./assets/loader.svg" alt="">
        <a href="#" class="download-btn">
        <img src="./assets/download.svg" alt="">
        </a>
        </div>
        `
        ).join("");
        imageGallery.innerHTML = imgCardMarkUp;
        generateAiImages(userPrompt, userImageQuantity);
}


generateForm.addEventListener('submit', onhandleFormSubmission);