let hideSentences = ['🌟 Instant & Free academic success 🌟', '🏆 Boost my h-index 🏆', '✨ Beautify this page ✨']
let showSentences = ['😩 Let\'s feel miserable 😩', '⛔️ Do not click this ⛔️', '💥 I like it when it hurts 💥']

let button = document.createElement('button')
button.classList.add('zen-button', 'notzen')
button.innerHTML = hideSentences[Math.floor(Math.random() * hideSentences.length)]

button.addEventListener('click', () => {
    if (button.classList.contains('notzen')) {
        for (row of document.querySelectorAll('tr[role=row]')) {
            if (row.innerHTML.toUpperCase().includes('NOT ACCEPTED')) {
                //row.style = 'visibility: collapse'
                row.classList.add('hidden')
            }
        }

        button.innerHTML = showSentences[Math.floor(Math.random() * showSentences.length)]

        button.classList.toggle('notzen')
    } else {

        for (row of document.querySelectorAll('tr[role=row]')) {
            if (row.innerHTML.toUpperCase().includes('NOT ACCEPTED')) {
                //row.style = 'visibility: visible'
                row.classList.remove('hidden')
            }
        }

        button.innerHTML = hideSentences[Math.floor(Math.random() * hideSentences.length)]

        button.classList.toggle('notzen')
    }
})



document.querySelector('body').append(button)
