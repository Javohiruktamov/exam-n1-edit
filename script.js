let elForm = document.querySelector(".form")
let elFormInput = elForm.querySelector(".form__input")
let elFormInput2 = elForm.querySelector(".form__input2")
let elFormInput3 = elForm.querySelector(".form__input3")
let elTemplate = document.querySelector(".template").content
let elList = document.querySelector(".list")

let todosArr = JSON.parse(localStorage.getItem("books")) || []

const editTodo = e => {
    let dataId = e.target.dataset.Id

    let foundEdit = todosArr.find(item => item.id == dataId)

    foundEdit.bookname = prompt("Edit bookname")
    foundEdit.writer = prompt("Edit writer")
    foundEdit.pages = prompt("Edit pages")
    localStorage.setItem("books", JSON.stringify(todosArr))


    renderArr(todosArr, elList)
}

const deleteTodo = e => {
    let dataId = e.target.dataset.Id

    let foundTodo = todosArr.findIndex(item => item.id == dataId)

    todosArr.splice(foundTodo, 1)
    localStorage.setItem("books", JSON.stringify(todosArr))

    renderArr(todosArr, elList)
}

function renderArr(arr, list) {
    list.innerHTML = null

    arr.map(item => {

        let cloneTemplate = elTemplate.cloneNode(true)
        let todoContent = cloneTemplate.querySelector(".list__item-content")
        let todowiter = cloneTemplate.querySelector(".list__item-writer")
        let todopages = cloneTemplate.querySelector(".list__item-pages")
        let deleteBtn = cloneTemplate.querySelector(".list__item-delete")
        let editBtn = cloneTemplate.querySelector(".list__item-edit")





        deleteBtn.dataset.Id = item.id
        editBtn.dataset.Id = item.id


        todoContent.textContent = "Bookname " + item.bookname
        todowiter.textContent = "Autor: " + item.writer
        todopages.textContent = "Page: " + item.pages



        deleteBtn.addEventListener("click", deleteTodo)
        editBtn.addEventListener("click", editTodo)

        localStorage.setItem("books", JSON.stringify(todosArr))

        list.appendChild(cloneTemplate)

    })
}

elForm.addEventListener("submit", e => {

    e.preventDefault()
    let inputValue = elFormInput.value.trim()
    let inputValue2 = elFormInput2.value.trim()
    let inputValue3 = elFormInput3.value.trim()

    if (inputValue != "" && inputValue2 != "" && inputValue3 != "") {
        todosArr.push({
            id: new Date().getMilliseconds(),
            bookname: inputValue,
            writer: inputValue2,
            pages: inputValue3,
        })
        elFormInput.value = null
        elFormInput2.value = null
        elFormInput3.value = null


        localStorage.setItem("books", JSON.stringify(todosArr))
        renderArr(todosArr, elList)
    } else {
        alert("Barcha fildlarni to'ldirishingiz shart!!!")
    }
})
renderArr(todosArr, elList)