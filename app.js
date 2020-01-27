// hook up new book
// hook up destory
// hook up read control
// hook up localstorage
// that's it?

let myLibrary = [];
let library = document.querySelector('#book-container')

const hobbit = new Book("The Hobbit","J.R.R. Tolkien", 486, true)
const waters = new Book(' Chez Panisse Menu Cookbook', 'Alice Waters', 215, false)

myLibrary.push(hobbit);
myLibrary.push(waters);
myLibrary.push(hobbit);
myLibrary.push(waters);
myLibrary.push(hobbit);
myLibrary.push(waters);
myLibrary.push(hobbit);myLibrary.push(hobbit);

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

function render(){
    for (let book of myLibrary) {
        let newBook = document.createElement('div');
        newBook.classList.add('book-card');
        // card needs an id 
        newBook.innerHTML = book.info();
        library.appendChild(newBook);
    }
}

render()