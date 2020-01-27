"use strict";

const myLibrary = [];

// if local library data exists, populate array with books from data
if (localStorage.getItem('myLibrary')) {
    let storedData = JSON.parse(localStorage.getItem('myLibrary'));
    for (let book of storedData) {
        // data is object, .values is an array, spread to constructor
        myLibrary.push(new Book(...Object.values(book)))
    }
}

// if there is no stored library, on load create example books
if (!myLibrary.length) {
    const hobbit = new Book("The Hobbit","J.R.R. Tolkien", 486, true)
    const waters = new Book('Chez Panisse Menu Cookbook', 'Alice Waters', 215, false)
    myLibrary.push(hobbit);
    myLibrary.push(waters);
}

render()

// constructor
function Book(title, author, numPages, read) {
    this.title = title
    this.author = author
    this.numPages = numPages
    this.read = read
    this.readPrint = function() {
        return read ? `<button class="yep">read</button>` :
         `<button class="nope">not read</button>`;
    }
    this.info = function() {
        return `<button class="remove nope">X</button>
        <h3>${this.title}</h3>
        <p>by ${this.author}</p>
        <p>${this.numPages} pages</p>
        ${this.readPrint()}`
    }
}

function bookSubmit(){
    // let dataValues = query(inputs).values
    const newBook = new Book(title, author, numPages, read);
    myLibrary.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}


function render(){
    let libView = document.querySelector('#book-container')
    for (let book of myLibrary) {
        let newBook = document.createElement('div');
        newBook.classList.add('book-card');
        // card needs an id 
        newBook.innerHTML = book.info();
        libView.appendChild(newBook);
    }
}

