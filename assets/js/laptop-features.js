let photoValid = true; 
let laptopNameValid = true;
let laptopBrandValid = true; 
let cpuValid = true;
let coreValid = true; 
let threadsValid = true; 
let ramValid = true; 
let memoryValid = true; 
let priceValid = true; 
let stateValid = true;

// photo warning select
const warningPhoto = document.querySelector('.photo-warning');
// image
const dropContainer = document.getElementById('dropContainer');
const photo = document.getElementById('photo');
const notUploadFileContainer = document.querySelectorAll('.photo-not-uploaded');
const uploadFileContainer = document.querySelector('.photo-uploaded');
const laptopPhodoImg = document.querySelector('#laptop-photo-img');
const photoSrc = document.querySelector('.photo-source');
const photoData = document.querySelector('.photo-data');
let photoFile = null;
dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
    evt.preventDefault();
};
dropContainer.ondrop = function(evt) {
    photo.files = evt.dataTransfer.files;
    const file = photo.files[0];
    readeImgFile(file);
    evt.preventDefault();
};
photo.addEventListener('change', function () {
    const file = this.files[0];
    readeImgFile(file);
})
function readeImgFile(file){
    if(file) {
        photoFile = file;
        dropContainer.classList.remove('photo-upload-container');
        const reader = new FileReader();
        reader.addEventListener('load', function() {
            notUploadFileContainer.forEach(el => {
                el.style.display = 'none';
            })
            photoValid = true;
            photoSrc.innerHTML = file.name;
            photoData.innerHTML = (file.size / 1048576).toFixed(2) + " mb";
            uploadFileContainer.style.display = 'flex';
            laptopPhodoImg.setAttribute('src', this.result);
            dropContainer.classList.remove('valid-error-img');
        })
        reader.readAsDataURL(file);
    }  
}
// VALIDATION

//select laptopName
const laptopContainer = document.querySelector('.laptop-name-container');
const laptopName = document.getElementById('laptop-name');
const laptopParagraph = document.querySelector('.laptop-name-container p');
const regexEngAndSpecialChars = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;

laptopName.value = localStorage.getItem('laptopName') ? localStorage.getItem('laptopName') : '';

laptopName.addEventListener('change', el => {
    if(!el.target.value.trim()){
        laptopContainer.classList.add('valid-error');
        laptopParagraph.innerHTML = 'ეს ველი სავალდებულოა';
        laptopNameValid = false;
    } else if(!el.target.value.trim().match(regexEngAndSpecialChars)){
        laptopContainer.classList.add('valid-error');
        laptopParagraph.innerHTML = 'ველი უნდა შეიცავდეს მხოლოდ ლათინურ სიმბოლოებს, რიცხვებსა და !@#$%^&*()_+=';
        laptopNameValid = false;
    } else {
        laptopContainer.classList.remove('valid-error');
        laptopParagraph.innerHTML = 'ლათინური ასოები, ციფრები, !@#$%^&*()_+=';
        localStorage.setItem('laptopName', el.target.value.trim());
        laptopNameValid = true;
    }
});
// fetch brands
const laptopBrandSelect = document.getElementById('laptop-brand');
const laptopBrandsContainer = document.querySelector('.laptop-brands-container');

fetch('https://pcfy.redberryinternship.ge/api/brands')
    .then(response => response.json())
    .then(data => {
        data.data.forEach(item => {
            const brandOption = document.createElement("option");
            brandOption.innerHTML = item.name;
            brandOption.value = item.id;
            laptopBrandSelect.appendChild(brandOption);
            if(localStorage.getItem('laptopBrand') && item.id == localStorage.getItem('laptopBrand')) {
                brandOption.selected = true;
            }
        })
    })


//validation brands
function required (value, selectItem,valid){
    if(!value){
        selectItem.classList.add('valid-error');
        valid = false;
    }else{
        selectItem.classList.remove('valid-error');
        valid = true;
    }
}
laptopBrandSelect.addEventListener('change', (el) => {
    required(el.target.value, laptopBrandsContainer, laptopBrandValid);
    localStorage.setItem('laptopBrand', el.target.value);
});

// CPU fetch
const selectCPU = document.getElementById('CPU');
const containerCPU = document.querySelector('.CPU-container');

fetch('https://pcfy.redberryinternship.ge/api/cpus')
    .then(response => response.json())
    .then(data => {
        data.data.forEach(item => {
            const optionCPU = document.createElement('option');
            optionCPU.innerHTML = item.name ;
            optionCPU.value = item.name;
            selectCPU.appendChild(optionCPU);
            if(localStorage.getItem('cpu') && item.name == localStorage.getItem('cpu')){
                optionCPU.selected = true
            }
        })
    })

// validation cpu
selectCPU.addEventListener('change', (el) => {
    required(el.target.value, containerCPU, cpuValid);
    localStorage.setItem('cpu', el.target.value);
})


// CPU-core,CPU-threads, Buy-time validation
function numberInputValidation(value, container, paragraph, name, valid){
    if(!value){
        container.classList.add('valid-error');
        paragraph.innerHTML = 'ეს ველი სავალდებულოა';
        valid = false;
    }else if(!value.match(/^[0-9]*$/)){
        container.classList.add('valid-error');
        paragraph.innerHTML = 'გამოიყენეთ მხოლოდ ციფრები';
        valid = false;
    } else{
        container.classList.remove('valid-error');
        paragraph.innerHTML = 'მხოლოდ ციფრები';
        localStorage.setItem(name, value);
        valid = true;
    }
}


// core validation
const coreCPU = document.getElementById('CPU-core');
const coreCPUcontainer = document.querySelector('.CPU-core-container');
const coreParagraph = document.querySelector('.CPU-core-container p');
coreCPU.value = localStorage.getItem('core') ? localStorage.getItem('core') : '';


coreCPU.addEventListener('change', (el) => {
    numberInputValidation(el.target.value.trim(), coreCPUcontainer, coreParagraph, 'core', coreValid);
})
// threads validation
const threadsCPU = document.getElementById('CPU-threads');
const threadsCPUcontainer = document.querySelector('.CPU-threads-container');
const threadsParagraph = document.querySelector('.CPU-threads-container p');
threadsCPU.value = localStorage.getItem('threads') ? localStorage.getItem('threads') : '';

threadsCPU.addEventListener('change', (el) => {
    numberInputValidation(el.target.value.trim(), threadsCPUcontainer, threadsParagraph, 'threads', threadsValid);
})
// RAM validtion
const RAM = document.getElementById('RAM');
const containerRAM = document.querySelector('.RAM-container');
const paragraphRAM = document.querySelector('.RAM-container p');
RAM.value = localStorage.getItem('ram') ? localStorage.getItem('ram') : '';

RAM.addEventListener('change', (el) => {
    numberInputValidation(el.target.value.trim(), containerRAM, paragraphRAM, 'ram', ramValid);
})
// laptop price
const laptopPrice = document.getElementById('laptop-price');
const laptopPriceContainer = document.querySelector('.laptop-price-container');
const laptopPriceParagraph = document.querySelector('.laptop-price-container p');
laptopPrice.value = localStorage.getItem('price') ? localStorage.getItem('price') : '';

laptopPrice.addEventListener('change', (el)=> {
    numberInputValidation(el.target.value.trim(), laptopPriceContainer, laptopPriceParagraph, 'price', priceValid);
});

// buy-date not required
// local storage
const buyDate = document.getElementById('buy-date');
buyDate.value = localStorage.getItem('buyDate') ? localStorage.getItem('buyDate') : '';

buyDate.addEventListener('change', (el) => {
    localStorage.setItem('buyDate', el.target.value);
});
// radios memory type
const memoryTypeContainer = document.querySelector('.memory-type-container');
const ssd = document.getElementById('ssd');
const hdd = document.getElementById('hdd');

if(localStorage.getItem('memoryType') && ssd.value == localStorage.getItem('memoryType')){
    ssd.checked = true;
};

if(localStorage.getItem('memoryType') && hdd.value == localStorage.getItem('memoryType')){
    hdd.checked = true;
};

ssd.addEventListener('click', (el) => {
    localStorage.setItem('memoryType', el.target.value);
    memoryTypeContainer.classList.remove('valid-error');
    memoryValid = true;
})
hdd.addEventListener('click', (el) => {
    localStorage.setItem('memoryType', el.target.value);
    memoryTypeContainer.classList.remove('valid-error');
    memoryValid = true;
})
// radios state 
const stateContainer = document.querySelector('.state-container');
const newLaptop = document.getElementById('new');
const secondaryLaptop = document.getElementById('secondary');

if(localStorage.getItem('state') && newLaptop.value == localStorage.getItem('state')){
    newLaptop.checked = true;
}

if(localStorage.getItem('state') && secondaryLaptop.value == localStorage.getItem('state')){
    secondaryLaptop.checked = true;
}

newLaptop.addEventListener('click', (el) => {
    localStorage.setItem('state', el.target.value);
    stateContainer.classList.remove('valid-error');
    stateValid = true;
})
secondaryLaptop.addEventListener('click', (el) => {
    localStorage.setItem('state', el.target.value);
    stateContainer.classList.remove('valid-error');
    stateValid = true;
})



// submit form 
const submitForm = document.getElementById('form-submit');

submitForm.addEventListener('submit', (el) => {
    el.preventDefault();

    if(!photo.value){
        dropContainer.classList.add('valid-error-img');
        photoValid = false;
    }
    if(!laptopName.value){
        laptopContainer.classList.add('valid-error');
        laptopParagraph.innerHTML = 'ეს ველი სავალდებულოა';
        laptopNameValid = false;
    }
    if(!laptopBrandSelect.value){
        laptopBrandsContainer.classList.add('valid-error');
        laptopBrandValid = false;
    }
    if(!selectCPU.value){
        containerCPU.classList.add('valid-error');
        cpuValid = false;
    }
    if(!coreCPU.value){
        coreCPUcontainer.classList.add('valid-error');
        coreParagraph.innerHTML = 'ეს ველი სავალდებულოა';
        coreValid = false;
    }
    if(!threadsCPU.value){
        threadsCPUcontainer.classList.add('valid-error');
        threadsParagraph.innerHTML = 'ეს ველი სავალდებულოა'
        threadsValid = false;
    }
    if(!RAM.value){
        containerRAM.classList.add('valid-error');
        paragraphRAM.innerHTML = 'ეს ველი სავალდებულოა';
        ramValid = false;
    }
    if(!localStorage.getItem('memoryType')){
        memoryTypeContainer.classList.add('valid-error');
        memoryValid = false;
    }
    if(!laptopPrice.value){
        laptopPriceContainer.classList.add('valid-error');
        laptopPriceParagraph.innerHTML = 'ეს ველი სავალდებულოა';
        priceValid = false;
    }
    if(!localStorage.getItem('state')){
        stateContainer.classList.add('valid-error');
        stateValid = false;
    }
    if(
        photoValid &&
        laptopNameValid &&
        laptopBrandValid  &&
        cpuValid  &&
        coreValid  &&
        threadsValid  &&
        ramValid  &&
        memoryValid  &&
        priceValid  &&
        stateValid 
    ){
        const formData = new FormData();
        formData.append('name', localStorage.getItem('firstName'));
        formData.append('surname', localStorage.getItem('lastName'));
        formData.append('team_id', localStorage.getItem('team'));
        formData.append('position_id', localStorage.getItem('position'));
        formData.append('phone_number', localStorage.getItem('mobile'));
        formData.append('email', localStorage.getItem('email'));
        formData.append('token', 'f82b277af6d81d49299fb1a624ba7c92');
        formData.append('laptop_name', localStorage.getItem('laptopName'));
        formData.append('laptop_image', photoFile);
        formData.append('laptop_brand_id', localStorage.getItem('laptopBrand'));
        formData.append('laptop_cpu', localStorage.getItem('cpu'));
        formData.append('laptop_cpu_cores', localStorage.getItem('core'));
        formData.append('laptop_cpu_threads', localStorage.getItem('threads'));
        formData.append('laptop_ram', localStorage.getItem('ram'));
        formData.append('laptop_hard_drive_type', localStorage.getItem('memoryType'));
        formData.append('laptop_state', localStorage.getItem('state'));
        formData.append('laptop_purchase_date', localStorage.getItem('buyDate') ?? '');
        formData.append('laptop_price', localStorage.getItem('price'));

        fetch('https://pcfy.redberryinternship.ge/api/laptop/create',
        {
            method: 'POST',
            body: formData
        })  
        .then(response => response.json())
        .then(data => {
            if(data.errors){
                console.log(data)
            } else {
             window.location.href = "success-page.html";
            }
        })
        .catch(e => {
            console.log(e);
        })
    }
});