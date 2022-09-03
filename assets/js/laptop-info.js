const laptopId = localStorage.getItem('laptopId')

fetch(`https://pcfy.redberryinternship.ge/api/laptop/${laptopId}?token=bc715926e15b39ce089b2cd82e025c2c`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        team(data.data.user.team_id)
    })
    .catch(e => {
        console.log('error -> ', e)
    })

function team(id) {
    fetch('https://pcfy.redberryinternship.ge/api/teams')
        .then(response => response.json())
        .then(data => {
            data.data.forEach(element => {
                if(id == element.id){
                    console.log(element)
                }
            });
            
        })
}