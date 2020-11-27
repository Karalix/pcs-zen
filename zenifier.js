let button = document.createElement('button')
button.classList.add('zen-button', 'notzen')
button.innerHTML = '🌟 Instant & Free academic success 🌟'
button.style = 
`
border-radius: 15px;
position: fixed;
top: 10px;
right: 10px;
background-color: white;
color: green;
border-style: inset;
border-color: green;
padding: 5px;
`

button.addEventListener('click', () => {
    if (button.classList.contains('notzen')) {
        for (row of document.querySelectorAll('tr[role=row]')) {
            if (row.innerHTML.toUpperCase().includes('NOT ACCEPTED')) {
                row.style = 'visibility: collapse'
            }
        }

        button.innerHTML = '😩 Let\'s feel miserable 😩'
        button.style = `
        border-radius: 15px;
        position: fixed;
        top: 10px;
        right: 10px;
        background-color: white;
        color: red;
        border-style: inset;
        border-color: red;
        padding: 5px;
        `

        button.classList.toggle('notzen')
    } else {

        for (row of document.querySelectorAll('tr[role=row]')) {
            if (row.innerHTML.toUpperCase().includes('NOT ACCEPTED')) {
                row.style = 'visibility: visible'
            }
        }

        button.innerHTML = '🌟 Instant & Free academic success 🌟'
        button.style = `
        border-radius: 15px;
        position: fixed;
        top: 10px;
        right: 10px;
        background-color: white;
        color: green;
        border-style: inset;
        border-color: green;
        padding: 5px;
        `

        button.classList.toggle('notzen')
    }
})



document.querySelector('body').append(button)
