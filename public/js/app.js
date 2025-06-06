const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#par1')
const message2 = document.querySelector('#par2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('/weather?address=' + location).then((response) => {

        response.json().then((data)=> {
            if(data.error){
                message1.textContent = data.error
            }
            else{
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })

})