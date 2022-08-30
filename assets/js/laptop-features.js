// image
const dropContainer = document.getElementById('dropContainer')
const photo = document.getElementById('photo')
const notUploadFileContainer = document.querySelectorAll('.photo-not-uploaded')
const uploadFileContainer = document.querySelector('.photo-uploaded')
const laptopPhodoImg = document.querySelector('#laptop-photo-img')
dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
    evt.preventDefault();
};
dropContainer.ondrop = function(evt) {
    photo.files = evt.dataTransfer.files;
    const file = photo.files[0]
    readeImgFile(file)
    evt.preventDefault();
};
photo.addEventListener('change', function () {
    const file = this.files[0]
    readeImgFile(file)
})
function readeImgFile(file){
    if(file) {
        const reader = new FileReader()
        reader.addEventListener('load', function() {
            notUploadFileContainer.forEach(el => {
                el.style.display = 'none'
            })
            uploadFileContainer.style.display = 'block'
            laptopPhodoImg.setAttribute('src', this.result)
        })
        reader.readAsDataURL(file)
    }
}
// validation

//select laptopName
const laptopContainer = document.querySelector('.laptop-name-container')
const laptopName = document.getElementById('laptop-name');
const laptopParagraph = document.querySelector('.laptop-name-container p')
const regexEngAndSpecialChars = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g

laptopName.value = localStorage.getItem('laptopName') ? localStorage.getItem('laptopName') : '';

laptopName.addEventListener('change', el => {
    if(!el.target.value.trim()){
        laptopContainer.classList.add('valid-error')
        laptopParagraph.innerHTML = 'ეს ველი სავალდებულოა'
    } else if(!el.target.value.trim().match(regexEngAndSpecialChars)){
        laptopContainer.classList.add('valid-error')
        laptopParagraph.innerHTML = 'ველი უნდა შეიცავდეს მხოლოდ ლათინურ სიმბოლოებს, რიცხვებსა და !@#$%^&*()_+='
    } else {
        laptopContainer.classList.remove('valid-error')
        laptopParagraph.innerHTML = 'ლათინური ასოები, ციფრები, !@#$%^&*()_+='
        localStorage.setItem('laptopName', el.target.value.trim())
    }
})
// fetch brands
const laptopBrandSelect = document.getElementById('laptop-brand');
const laptopBrandsContainer = document.querySelector('.laptop-brands-container')

fetch('https://pcfy.redberryinternship.ge/api/brands')
    .then(response => response.json())
    .then(data => {
        data.data.forEach(item => {
            const brandOption = document.createElement("option");
            brandOption.innerHTML = item.name
            brandOption.value = item.id
            laptopBrandSelect.appendChild(brandOption)
            if(localStorage.getItem('laptopBrand') && item.id == localStorage.getItem('laptopBrand')) {
                brandOption.selected = true
            }
        })
    })


//validation brands
function required (value, selectItem){
    if(!value){
        selectItem.classList.add('valid-error')
    }else{
        selectItem.classList.remove('valid-error')
    }
}
laptopBrandSelect.addEventListener('change', (el) => {
    required(el.target.value, laptopBrandsContainer)
    localStorage.setItem('laptopBrand', el.target.value)
})

// CPU fetch
const selectCPU = document.getElementById('CPU');
const containerCPU = document.querySelector('.CPU-container');

fetch('https://pcfy.redberryinternship.ge/api/cpus')
    .then(response => response.json())
    .then(data => {
        data.data.forEach(item => {
            const optionCPU = document.createElement('option');
            optionCPU.innerHTML = item.name ;
            optionCPU.value = item.id;
            selectCPU.appendChild(optionCPU);
            if(localStorage.getItem('cpu') && item.id == localStorage.getItem('cpu')){
                optionCPU.selected = true
            }
        })
    })

// validation
selectCPU.addEventListener('change', (el) => {
    required(el.target.value, containerCPU);
    localStorage.setItem('cpu', el.target.value)
})


// CPU-core,CPU-threads, Buy-time validation
function numberInputValidation(value, container, paragraph, name){
    if(!value){
        container.classList.add('valid-error');
        paragraph.innerHTML = 'ეს ველი სავალდებულოა';
    }else if(!value.match(/^[0-9]*$/)){
        container.classList.add('valid-error');
        paragraph.innerHTML = 'გამოიყენეთ მხოლოდ ციფრები';
    } else{
        container.classList.remove('valid-error');
        paragraph.innerHTML = 'მხოლოდ ციფრები';
        localStorage.setItem(name, value)
    }
}


// core validation
const coreCPU = document.getElementById('CPU-core');
const coreCPUcontainer = document.querySelector('.CPU-core-container');
const coreParagraph = document.querySelector('.CPU-core-container p');
coreCPU.value = localStorage.getItem('core') ? localStorage.getItem('core') : '';


coreCPU.addEventListener('change', (el) => {
    numberInputValidation(el.target.value.trim(), coreCPUcontainer, coreParagraph, 'core');
})
// state validation
const threadsCPU = document.getElementById('CPU-threads');
const threadsCPUcontainer = document.querySelector('.CPU-threads-container');
const threadsParagraph = document.querySelector('.CPU-threads-container p');
threadsCPU.value = localStorage.getItem('threads') ? localStorage.getItem('threads') : '';

threadsCPU.addEventListener('change', (el) => {
    numberInputValidation(el.target.value.trim(), threadsCPUcontainer, threadsParagraph, 'threads');
})
// RAM validtion
const RAM = document.getElementById('RAM');
const containerRAM = document.querySelector('.RAM-container');
const paragraphRAM = document.querySelector('.RAM-container p');
RAM.value = localStorage.getItem('ram') ? localStorage.getItem('ram') : '';

RAM.addEventListener('change', (el) => {
    numberInputValidation(el.target.value.trim(), containerRAM, paragraphRAM, 'ram');
})
// laptop price
const laptopPrice = document.getElementById('laptop-price');
const laptopPriceContainer = document.querySelector('.laptop-price-container');
const laptopPriceParagraph = document.querySelector('.laptop-price-container p');
laptopPrice.value = localStorage.getItem('price') ? localStorage.getItem('price') : '';

laptopPrice.addEventListener('change', (el)=> {
    numberInputValidation(el.target.value.trim(), laptopPriceContainer, laptopPriceParagraph, 'price')
});

// buy-date not required
// local storage
const buyDate = document.getElementById('buy-date');
buyDate.value = localStorage.getItem('buyDate') ? localStorage.getItem('buyDate') : '';

buyDate.addEventListener('change', (el) => {
    localStorage.setItem('buyDate', el.target.value)
})
// radios memory type
const memoryTypeContainer = document.querySelector('.memory-type-container')
const ssd = document.getElementById('ssd')
const hdd = document.getElementById('hdd')

if(localStorage.getItem('memoryType') && ssd.value == localStorage.getItem('memoryType')){
    ssd.checked = true
}

if(localStorage.getItem('memoryType') && hdd.value == localStorage.getItem('memoryType')){
    hdd.checked = true
}

ssd.addEventListener('click', (el) => {
    localStorage.setItem('memoryType', el.target.value)
})
hdd.addEventListener('click', (el) => {
    localStorage.setItem('memoryType', el.target.value)
})
// radios state 
const stateContainer = document.querySelector('.state-container');
const newLaptop = document.getElementById('new');
const secondaryLaptop = document.getElementById('secondary');

if(localStorage.getItem('state') && newLaptop.value == localStorage.getItem('state')){
    newLaptop.checked = true
}

if(localStorage.getItem('state') && secondaryLaptop.value == localStorage.getItem('state')){
    secondaryLaptop.checked = true
}

newLaptop.addEventListener('click', (el) => {
    localStorage.setItem('state', el.target.value);
})
secondaryLaptop.addEventListener('click', (el) => {
    localStorage.setItem('state', el.target.value);
})
