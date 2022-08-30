const dropContainer = document.getElementById('dropContainer')
const photo = document.getElementById('photo')

dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
    evt.preventDefault();
};

dropContainer.ondrop = function(evt) {
    photo.files = evt.dataTransfer.files;
    evt.preventDefault();
};

photo.addEventListener('change', el => {
    console.log(el)
    const img = document.createElement('img')
    img.src = el.target.value
    dropContainer.appendChild(img)
})