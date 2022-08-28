let firstNameValid = true 
let lastNameValid = true
let teamValid = true 
let positionValid = true 
let emailValid = true 
let mobileValid = true 
// select firstName
const firstName = document.getElementById('firstname');
const firstNameContainer = document.querySelector('.firstname');
const firstNameErrorMessage = document.querySelector('.firstname p');
// local storage
firstName.value = localStorage.getItem('firstName') ? localStorage.getItem('firstName') : '';
// firstName validation
firstName.addEventListener('change', (el) => {
    if(!el.target.value.trim()) {
        firstNameContainer.classList.add('valid-error');
        firstNameErrorMessage.innerHTML = 'ეს ველი სავალდებულოა';
        firstNameValid = false
    }else if(el.target.value.trim().length < 2){
        firstNameContainer.classList.add('valid-error');
        firstNameErrorMessage.innerHTML = 'გამოიყენეთ მინიმუმ 2 სიმბოლო';
        firstNameValid = false
    } else if (!checkLang(el.target.value.trim())) {
        firstNameContainer.classList.add('valid-error');
        firstNameErrorMessage.innerHTML = 'გამოიყენეთ მხოლოდ ქართული სიმბოლოები';
        firstNameValid = false
    } else {
        localStorage.setItem('firstName', el.target.value.trim())
        firstNameContainer.classList.remove('valid-error');
        firstNameErrorMessage.innerHTML = 'მინიმუმ 2 სიმბოლო, ქართული ასოები';
        firstNameValid = true
    }
});

// select lastName
const lastName = document.getElementById('lastname');
const lastNameContainer = document.querySelector('.lastname');
const lastNameErrorMessage = document.querySelector('.lastname p');
// local storage
lastName.value = localStorage.getItem('lastName') ? localStorage.getItem('lastName') : '';
// lastName validation
lastName.addEventListener('change', (el) => {
    if(!el.target.value.trim()){
        lastNameContainer.classList.add('valid-error');
        lastNameErrorMessage.innerHTML = 'ეს ველი სავალდებულოა';
        lastNameValid = false;
    }else if(el.target.value.trim().length < 2){
        lastNameContainer.classList.add('valid-error');
        lastNameErrorMessage.innerHTML = 'გამოიყენეთ მინიმუმ 2 სიმბოლო';
        lastNameValid = false;
    }else if(!checkLang(el.target.value.trim())){
        lastNameContainer.classList.add('valid-error');
        lastNameErrorMessage.innerHTML = 'გამოიყენეთ მხოლოდ ქართული სიმბოლოები';
        lastNameValid = false;
    }else{
        localStorage.setItem('lastName', el.target.value.trim());
        lastNameContainer.classList.remove('valid-error');
        lastNameErrorMessage.innerHTML = 'მინიმუმ 2 სიმბოლო, ქართული ასოები';
        lastNameValid = true;
    }
});
// only georgian alphabet function
function checkLang(text = '') {
    let spells = text.split('');
    for(let i = 0; i < spells.length; i++){
        if(!(/[ა-ჰ]/).test(spells[i]) && spells[i] !== ' '){
            return false;
        }
    }
    return true;
};
// select team select
const teamSelect = document.getElementById('team');
const teamSelectContainer = document.querySelector('.team-select-container');
//local storage
// const teamSelected = localStorage.getItem('team') ? localStorage.getItem('team') : '';
// console.log(teamSelected)

// fetch team options
fetch('https://pcfy.redberryinternship.ge/api/teams')
    .then(response => response.json())
    .then(data => {
        data.data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.innerHTML = item.name;
            teamSelect.appendChild(option);
            if(localStorage.getItem('team') && item.id == localStorage.getItem('team')) {
                option.selected = true
                postionSelectFetch(item.id);
            }
        })
     })
     .catch(error => console.log(error));

//team validation
teamSelect.addEventListener('change', (el) => {
    localStorage.removeItem('position')

    if(!el.target.value.trim()){
        teamSelectContainer.classList.add('valid-error');
        teamValid = false;
    }else{
        teamSelectContainer.classList.remove('valid-error');
        teamValid = true;
    }
    localStorage.setItem('team', el.target.value.trim());
    postionSelectFetch(el.target.value);
});

// select position select
const positionSelect = document.getElementById('position')
const positionSelectContainer = document.querySelector('.position-select-container')
const defalutOption = document.createElement('option')
defalutOption.value = ''
defalutOption.innerHTML = 'პოზიცია'
// local storage

// fetch position options
function postionSelectFetch(teamId){ 
    fetch('https://pcfy.redberryinternship.ge/api/positions')
        .then(response => response.json())
        .then(data => {
            positionSelect.innerHTML = ''
            positionSelect.appendChild(defalutOption)
            data.data.forEach(item => {
                if(teamId == item.team_id){
                    const option = document.createElement('option');
                    option.value = item.id
                    option.innerHTML = item.name
                    positionSelect.appendChild(option)
                    if(localStorage.getItem('position') && item.id == localStorage.getItem('position')) {
                        option.selected = true
                    }
                }
            })
        })
        .catch(error => console.log(error));
}
// position validation
positionSelect.addEventListener('change', (el) => {
    if(!el.target.value.trim()){
        positionSelectContainer.classList.add('valid-error')
        positionValid = false; 
    }else{
        positionSelectContainer.classList.remove('valid-error')
        positionValid = true;
    }
    localStorage.setItem('position', el.target.value.trim());
})
// select email
const email = document.getElementById('email');
const emailContainer = document.querySelector('.email');
const emailErrorMessage = document.querySelector('.email p');
const redberryMail = /^([A-Za-z0-9\._]+)@redberry.ge$/;
const mailValidation = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//local storage
email.value = localStorage.getItem('email') ? localStorage.getItem('email') : '';
// email validation
email.addEventListener('change', (el) => {
    if(!el.target.value.trim()){
        emailContainer.classList.add('valid-error');
        emailErrorMessage.innerHTML = 'ეს ველი სავალდებულოა';
        emailValid = false;
    }else if(!el.target.value.match(mailValidation)){
        emailContainer.classList.add('valid-error');
        emailValid = false;
        emailErrorMessage.innerHTML = 'ეს ველი განკუთვნილია მეილისთვის';
    }else if(!el.target.value.match(redberryMail)){
        emailContainer.classList.add('valid-error');
        emailErrorMessage.innerHTML = 'უნდა მთავრდებოდეს @redberry.ge-თი';
        emailValid = false;
    }else{
        localStorage.setItem('email', el.target.value.trim());
        emailContainer.classList.remove('valid-error');
        emailErrorMessage.innerHTML = 'უნდა მთავრდებოდეს @redberry.ge-თი';
        emailValid = true; 
    }
})


// select mobile
const mobile = document.getElementById('mobile');
const mobileContainer = document.querySelector('.mobile');
const mobileParagraph = document.querySelector('.mobile p');
const mobileErrorMessage = document.createElement('p')
mobileErrorMessage.classList.add('paragraph')
// const geoNumber =  /^(+?995)?(5|79)\d{7}$/


// local storage
mobile.value = localStorage.getItem('mobile') ? localStorage.getItem('mobile') : '';
// mobile validation
mobile.addEventListener('change', (el) => {
    if(!el.target.value.trim()){
        mobileContainer.classList.add('valid-error');
        mobileErrorMessage.innerHTML = 'ეს ველი სავალდებულოა';
        mobileErrorMessage.style.display = 'block';
        mobileContainer.appendChild(mobileErrorMessage);
        mobileParagraph.style.display = 'none'
        mobileValid = false;
    }else if(!checkNumber(el.target.value)) {
        mobileContainer.classList.add('valid-error');
        mobileErrorMessage.innerHTML = 'შეიყვანეთ ქართული მობილურის ნომერი';
        mobileErrorMessage.style.display = 'block';
        mobileContainer.appendChild(mobileErrorMessage);
        mobileParagraph.style.display = 'none'
        mobileValid = false;
    } else{
        localStorage.setItem('mobile', el.target.value.trim())
        mobileContainer.classList.remove('valid-error');
        mobileErrorMessage.style.display = 'none';
        mobileParagraph.style.display = 'block'
        mobileValid = true;
    }
})

function checkNumber(number) {
    let withoutSpace = number.replaceAll(' ', '')
    let geoNum = withoutSpace.slice(0, 5)
    if(geoNum == '+9955' && withoutSpace.length === 13){
        return true
    } else {
        return false
    }
}



// submit form
const form = document.getElementById('employee-info-form')

form.addEventListener('submit', (el) => {
    el.preventDefault();
    

    if(!firstName.value.trim()) {
        firstNameContainer.classList.add('valid-error');
        firstNameErrorMessage.innerHTML = 'ეს ველი სავალდებულოა';
        firstNameValid = false
    }
    if(!lastName.value.trim()){
        lastNameContainer.classList.add('valid-error');
        lastNameErrorMessage.innerHTML = 'ეს ველი სავალდებულოა';
        lastNameValid = false
    }
    if(!teamSelect.value.trim()){
        teamSelectContainer.classList.add('valid-error');
        teamValid = false
    }
    if(!positionSelect.value.trim()){
        positionSelectContainer.classList.add('valid-error');
        positionValid = false
    }
    if(!email.value.trim()){
        emailContainer.classList.add('valid-error');
        emailErrorMessage.innerHTML = 'ეს ველი სავალდებულოა';
        emailValid = false
    }
    if(!mobile.value.trim()){
        mobileContainer.classList.add('valid-error');
        mobileErrorMessage.innerHTML = 'ეს ველი სავალდებულოა';
        mobileErrorMessage.style.display = 'block';
        mobileContainer.appendChild(mobileErrorMessage);
        mobileParagraph.style.display = 'none'
        mobileValid = false
    }
    if(
        firstNameValid && 
        lastNameValid &&
        teamValid &&
        positionValid &&
        emailValid &&
        mobileValid
    ) {
        window.location.href = "/laptop-features.html";
    }
})









