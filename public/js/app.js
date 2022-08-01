

console.log('Client side javascript file is loaded!');




const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    fetch('http://localhost:3000/weather?address=' +search.value ).then(response => {
    return response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
        
    })

})

})