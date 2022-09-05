const laptopId = localStorage.getItem('laptopId');
console.log(laptopId);
const laptopImage = document.getElementById('laptopImage');
const firstName = document.getElementById('firstName');
const Team = document.getElementById('team');
const position = document.getElementById('position');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const laptopName = document.getElementById('laptopName');
const laptopBrand = document.getElementById('laptopBrand');
const RAM = document.getElementById('RAM');
const memoryType = document.getElementById('memoryType');
const CPU = document.getElementById('CPU');
const coreCPU = document.getElementById('coreCPU');
const threadCPU = document.getElementById('threadCPU');
const state = document.getElementById('state');
const price = document.getElementById('price');
const date = document.getElementById('date');

function team(id) {
    fetch('https://pcfy.redberryinternship.ge/api/teams')
        .then(response => response.json())
        .then(data => {
            data.data.forEach(element => {
                if(id == element.id){
                    Team.innerHTML = element.name
                }
            })      
        })
}
function brand(id){
    fetch('https://pcfy.redberryinternship.ge/api/brands')
        .then(response => response.json())
        .then(data => {
            data.data.forEach(element => {
                if(id == element.id){
                    laptopBrand.innerHTML = element.name
                }
            })
        })
}
function positionId(id){
    fetch('https://pcfy.redberryinternship.ge/api/positions')
        .then(response => response.json())
        .then(data => {
            data.data.forEach(element => {
                if(id == element.id){
                    position.innerHTML = element.name;
                }
            })
        })
};

// name
fetch(`https://pcfy.redberryinternship.ge/api/laptop/${laptopId}?token=bc715926e15b39ce089b2cd82e025c2c`)
    .then(response => response.json())
    .then(data => {
        //image
        laptopImage.src = 'https://pcfy.redberryinternship.ge' + data.data.laptop.image;
        // user 
        firstName.innerHTML = data.data.user.name;
        team(data.data.user.team_id);
        positionId(data.data.user.position_id);
        email.innerHTML = data.data.user.email;
        mobile.innerHTML = data.data.user.phone_number;
        // laptop
        laptopName.innerHTML = data.data.laptop.name;
        brand(data.data.user.brand_id);
        RAM.innerHTML = data.data.laptop.ram;
        memoryType.innerHTML = data.data.laptop.hard_drive_type;
        CPU.innerHTML = data.data.laptop.cpu.name;
        coreCPU.innerHTML = data.data.laptop.cpu.cores;
        threadCPU.innerHTML = data.data.laptop.cpu.threads;
        state.innerHTML = data.data.laptop.state;
        price.innerHTML = data.data.laptop.price;
        date.innerHTML = data.data.laptop.purchase_date;
    })
    .catch(e => {
        console.log('ERROR -> ', e);
    });