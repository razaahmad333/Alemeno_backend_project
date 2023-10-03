const API_URL = 'http://127.0.0.1:8000/api/'


document.querySelector('#stripImage').addEventListener('change', (e) => { 
    e.preventDefault();
    
    const imageFile = e.target.files[0]
    
    populateUploadedImage(imageFile);

    getStripColors(imageFile);
})


document.querySelector("#newSample").onclick = () => {
    document.querySelector('#uploadedImage').style.display = 'none';
    document.querySelector('#uploadedImage').children[0].src = '';
    document.querySelector('#stripImage').value = '';
    document.querySelector('#results').innerHTML = '';
}


function populateUploadedImage(imageFile){
    const imageSrc = URL.createObjectURL(imageFile)
    document.querySelector('#uploadedImage').style.display = 'block';
    document.querySelector('#uploadedImage').children[0].src = imageSrc;
}

function getStripColors(imageFile){
    const formData = new FormData()
    formData.append('image', imageFile)

    fetch(API_URL + 'urine_strip/', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(response => {
        const colors = response.colors;
        populateResults(colors);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function populateResults(colors){
    const results = document.querySelector('#results');
    results.innerHTML = '';

    for (let i = 0; i < colors.length; i++) {
        const r = colors[i][0];
        const g = colors[i][1];
        const b = colors[i][2];

        const color = `rgb(${r}, ${g}, ${b})`;

        const elementTemplate =  `
            <div class="col-md-2 mt-2">
                <div style="background-color: ${color}; width: 100%; height: 100px; border-radius:4px;" ></div>
            </div>
        `
        results.innerHTML += elementTemplate;
    }
}