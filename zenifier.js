let hideSentences = ['🌟 Instant & Free academic success 🌟', '🏆 Boost my h-index 🏆', '✨ Beautify this page ✨']
let showSentences = ['😩 Let\'s feel miserable 😩', '⛔️ Do not click this ⛔️', '💥 I like it when it hurts 💥']


browser.storage.local.get('pcshide').then((items) => {
    if (items.pcshide) {
        const observer = new MutationObserver((mutationList, observer) => {
            for(const mutation of mutationList) {
                if (mutation.type === 'childList') {
                    setTimeout(() => {
                        document.querySelector('.zen-button').click()
                        observer.disconnect()
                    }, 1000)
                }
            }
        })
        observer.observe(document.querySelector('#user_submissions_enclosure'), {childList: true})
    }
}).catch((e) => {
    console.error(e)
})

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
        browser.storage.local.set({pcshide : true})
    } else {

        for (row of document.querySelectorAll('tr[role=row]')) {
            if (row.innerHTML.toUpperCase().includes('NOT ACCEPTED')) {
                //row.style = 'visibility: visible'
                row.classList.remove('hidden')
            }
        }

        button.innerHTML = hideSentences[Math.floor(Math.random() * hideSentences.length)]

        button.classList.toggle('notzen')
        browser.storage.local.set({pcshide : false})
    }
})



document.querySelector('body').append(button)
