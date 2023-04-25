const inputs = document.querySelectorAll('[data-input]')
let inputDivs = document.getElementsByClassName('input')
const radioYes = document.getElementById('yes')
const radioNo = document.getElementById('no')
const radioDiv = document.querySelector('[data-radio-div]')
const submitButton = document.querySelector('[data-submit]')
const booksContainer = document.querySelector('.cards')
const cards = Array.from(document.getElementsByClassName("cards"))
const buttons = document.querySelectorAll('.deleteButtons')
inputDivs = Array.from(inputDivs)
const library = []

const values = []
let title = ''
let author = ''
let pages = ''
let read = ''


const getValues = function (inputs) {
    inputs.forEach((input) => {
        values.push(input.value)
    })
    values.push(document.querySelector('input[name="did-read"]:checked').value)
    title = values[0]
    author = values[1]
    pages = values[2]
    read = values[3]
}

function Book(title, author, pages, read) {
    const number = Math.floor(Math.random() *100000);
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = title + number
}

const eraseInfo = function (inputs) {
    inputs.forEach((input) => {
        input.value = ""
    })
    document.querySelector('input[name="did-read"]:checked').checked = false
}

function displayBooks(library) {
    
    library.forEach((book) => {
        const newCard = document.createElement("div");
        newCard.classList.add('card')
        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('id', book.id)
        deleteButton.setAttribute('onclick', 'deleteCard(this)')
        deleteButton.classList.add('deleteButton')
        const img = document.createElement('img')
        img.src = "/delete_FILL0_wght400_GRAD0_opsz48.png"
        deleteButton.appendChild(img)
        newCard.appendChild(deleteButton)
        const cardDiv = document.createElement('div')
        cardDiv.classList.add('txt')
        cardDiv.innerHTML = '<h2>'+book.title+'</h2>' + '<h3>Author: '+book.author+'</h3>' + '<h3>Pages: '+book.pages+'</h3>'
        const readButton = document.createElement('button')
        readButton.classList.add('readButton')
        readButton.setAttribute('id', book.id)
        if (book.read === 'yes') {
            readButton.classList.toggle('didRead')
            readButton.innerText = 'Read'
        } else {
            readButton.classList.toggle('didntRead')
            readButton.innerText = 'Not Read'
        }
        readButton.setAttribute('onclick', 'markAsRead(this)')
        cardDiv.appendChild(readButton)
        newCard.appendChild(cardDiv)
        booksContainer.appendChild(newCard)
    })

}

const removeCards = function() {
    if (booksContainer.firstChild) {
        while (booksContainer.firstChild) {
            booksContainer.removeChild(booksContainer.firstChild);
          }
        } else {
            return
        }
    return
}  


submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    inputs.forEach((input) => {
        if (input.value === '') {
            input.parentElement.classList.add('error')
        } else {
            input.parentElement.classList.remove('error')
        }
    })
    if (!radioYes.checked && !radioNo.checked) {
        radioDiv.classList.add('error')
    } else {
        radioDiv.classList.remove('error')
    }
    const check = inputDivs.every((div) => !div.classList.contains("error") && !radioDiv.classList.contains("error"))
    if (check) {
        getValues(inputs)
        eraseInfo(inputs)

    } else {
        return
    }
    
    const newBook = new Book(title, author, pages, read)
    library.push(newBook)
    while(values.length > 0) {
        values.pop();
    } 
    removeCards()
    displayBooks(library)
    return
})


function deleteCard(element) {
   
    let bookToDelete = library.find(book => book.id === element.id)
    indexOfBook = library.indexOf(bookToDelete)
    library.splice(indexOfBook, 1)
    element.parentElement.remove()
    
    return library
}

function markAsRead(element) {
    let bookToChange = library.find(book => book.id === element.id)
    if(bookToChange.read === 'yes') {
        bookToChange.read = 'no'
    } else {
        bookToChange.read = "yes"
    }
    removeCards()
    displayBooks(library)
}






