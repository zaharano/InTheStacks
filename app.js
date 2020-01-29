'use strict';

class Book {
    constructor(title, author, numPages, read) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = read;
    }
    readPrint() {
        return this.read
            ? `<button class="read yep">read</button>`
            : `<button class="read nope">unread</button>`;
    }
    info() {
        return `<button class="remove nope">X</button>
            <h3>${this.title}</h3>
            <p>by ${this.author}</p>
            <p>${this.numPages} pages</p>
            ${this.readPrint()}`;
    }
    activate(index) {
      this.index = index;
      const deleteButton = document.querySelector(`#bID${index} .remove`)
      deleteButton.addEventListener('click', () => {
        removeBook(index);
      })
      const readControl = document.querySelector(`#bID${index} .read`)
      readControl.addEventListener('click', () => {
        this.read = !this.read;
        document.querySelector(`#bID${index}`).innerHTML = this.info();
        this.activate(index)
      })
    }
}

const myLibrary = [];

// if local library data exists, populate array with books from data
if (localStorage.getItem('myLibrary')) {
    let storedData = JSON.parse(localStorage.getItem('myLibrary'));
    for (let book of storedData) {
        // book is object, .values is an array, spread to constructor
        myLibrary.push(new Book(...Object.values(book)));
    }
}

// if there is no stored library, create example books
if (!myLibrary.length) {
    const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 486, true);
    const waters = new Book(
        'Chez Panisse Menu Cookbook',
        'Alice Waters',
        215,
        false
    );
    myLibrary.push(hobbit);
    myLibrary.push(waters);
}

function render() {
    let libView = document.querySelector('#book-container');
    while (libView.firstChild)
      libView.removeChild(libView.firstChild)
    for (const [ index, book ] of myLibrary.entries()) {
        let newBook = document.createElement('div');
        newBook.classList.add('book-card');
        newBook.setAttribute('id', `bID${index}`)
        newBook.innerHTML = book.info();
        libView.appendChild(newBook);
        book.activate(index);
    }
}

function removeBook(index) {
  myLibrary.splice(index, 1)
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  render();
}

function closeWindow() {
  document.querySelector('#overlay').classList.add("hide"); 
  // ADD clear inputs as well or trigger reset
}

function init() {
  let addButton = document.querySelector('#add-book')
  addButton.addEventListener('click', () => {
    document.querySelector('#overlay').classList.remove("hide"); 
  });


  let cancelButton = document.querySelector('.cancel')
  cancelButton.addEventListener('click', closeWindow)

  const form = document.querySelector('#new');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const { title, author, pages, read } = form.elements;
    const newBook = new Book(title.value, author.value, pages.value, read[0].checked)
    myLibrary.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    closeWindow();
    render();
  })
  }

init();
render();


// book factory
// function Book(title, author, numPages, read) {
//   this.title = title;
//   this.author = author;
//   this.numPages = numPages;
//   this.read = read;
//   this.readPrint = function() {
//     return read
//       ? `<button class="yep">read</button>`
//       : `<button class="nope">not read</button>`;
//   };
//   this.info = function() {
//     return `<button class="remove nope">X</button>
//         <h3>${this.title}</h3>
//         <p>by ${this.author}</p>
//         <p>${this.numPages} pages</p>
//         ${this.readPrint()}`;
//   };
// }
