const firstName = document.getElementById('firstname');
const firstNameContainer = document.querySelector('.firstname')
const firstNameErrorMessage = document.querySelector('.firstname p')

const lastName = document.getElementById('lastname');

firstName.addEventListener('change', (el) => {
    if(!el.target.value) {
        firstNameContainer.classList.add('valid-error')
        firstNameErrorMessage.innerHTML = 'ეს ველი სავალდებულოა'
    }else if(el.target.value.length < 2){
        firstNameContainer.classList.add('valid-error')
        firstNameErrorMessage.innerHTML = 'გამოიყენეთ მინიმუმ 2 სიმბოლო'
    } else if (!checkLang(el.target.value.trim())) {
        firstNameContainer.classList.add('valid-error')
        firstNameErrorMessage.innerHTML = 'მხოლოდ ქართული სიმბოლოები'
    } else {
        firstNameContainer.classList.remove('valid-error')
        firstNameErrorMessage.innerHTML = 'მინიმუმ 2 სიმბოლო, ქართული ასოები'
    }
})

function checkLang(text = '') {
    let spells = text.split('');

    for(let i = 0; i < spells.length; i++){
        if(!(/[ა-ჰ]/).test(spells[i]) && spells[i] !== ' '){
            return false
        }
    }
    return true
}
