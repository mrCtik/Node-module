document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }

    if (event.target.dataset.type === 'update') {
        const id = event.target.dataset.id
        const parentNode = event.target.closest('li')
        const titleNode = parentNode.querySelector(".notes_title")
        const newTitle = prompt("Введите изменения", [titleNode.textContent])?.trim()

        if (newTitle !== undefined) {
            update(id, newTitle).then(() => {
                titleNode.textContent = newTitle;
            })
        }
    }

})

async function remove(id) {
    await fetch(`/${ id }`, {method: 'DELETE'})
}

async function update(id, newTitle) {
    await fetch(`/${ id }`, {
        method: 'PUT',
        body: JSON.stringify({title: newTitle}),
        headers:
            {
                'Content-type': 'application/json; charset=UTF-8'
            }
    })
}