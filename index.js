const Book = {
    title: "",
    author: "",
    pages: 0,
    read: false
}
//function is called eveytime the array containing the objects is updated
function saveLibrary(Library) {
    localStorage.setItem('storedLibrary', JSON.stringify(Library));
}
//function is called whenever a new object of the same kind needs to be made
function bookConstructor (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
let myLibrary = [];
//function checks if the local storage is populated, if it is it will display
//whatever it has stored
window.onload = () => {
    if (localStorage.getItem("storedLibrary") === null) {
        myLibrary = [];
    } else {
        let storedLibrary = JSON.parse(localStorage.getItem("storedLibrary"));
        let localLibrary = storedLibrary.map((key) => {
          myLibrary.push(key);
        });

        displayLoop();
    }
}
//function that targets the prototype of the object being called upon
bookConstructor.prototype.deleteBook = function(index) {
    let storedLibrary = JSON.parse(localStorage.getItem("storedLibrary"));
    storedLibrary.splice(index, 1);
    localStorage.setItem('storedLibrary', JSON.stringify(storedLibrary));
    myLibrary.splice(index,1);
}
bookConstructor.prototype.displayCheck = function(index) {
        let readStat = this.read;
        if (readStat != true){
           this.read = "Will read 🔜";
        } else {
            this.read = "Read✅";
        }
}
bookConstructor.prototype.updateCheck = function(index) {
    let readStat = this.read;
    if (readStat == "Read✅"){
       this.read = "Will read 🔜";
    } else {
        this.read = "Read✅";
    }
}
function addBookToLibrary(title, author, pages, read) {
    //creates a new object (book) 
   let newBook =  new bookConstructor(title, author, pages, read);
   //stores the new object in the global array
   myLibrary.push(newBook);
   //saves global array in local storage
   saveLibrary(myLibrary);
}
const addBookBtn = document.querySelector('.addBookBtn');
addBookBtn.addEventListener('click', () => {
    openForm();
});
const submitBtn = document.querySelector('.submitBtn');
submitBtn.addEventListener('click', () => {
    let newTitle = document.getElementById("title");
    let newAuthor = document.getElementById("author");
    let newPages = document.getElementById("pages");
    let newRead = document.getElementById("read");
    if (newTitle.value !== "") {
        addBookToLibrary(newTitle.value, newAuthor.value, newPages.value, newRead.checked);
        displayLoop();
        closeForm();
    } else {
        newTitle.setCustomValidity(
            "At least put down the title of the book!"
          );
    }
});
function displayLoop() {
    let grid = document.querySelector(".grid");
    grid.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {

        let temp = myLibrary[i];
        let currentBook = new bookConstructor(temp.title, temp.author, temp.pages, temp.read);

        const bCard = document.createElement('div');
        const bTitle = document.createElement('p');
        const bAuthor = document.createElement('p');
        const bPages = document.createElement('p');
        const bRead = document.createElement('p');
        const buttonContainer = document.createElement('div');
        const bTrash = document.createElement("p");
        const buttonRead = document.createElement('p');

        bCard.id = i;
        bTrash.addEventListener("click", (e) => {
            currentBook.deleteBook(bCard.id);
            grid.innerHTML = '';
            displayLoop();
        });

        bCard.classList.add('card');
        currentBook.displayCheck();
        buttonRead.addEventListener("click", () => {
             
            currentBook.updateCheck();
            bRead.innerHTML = currentBook.read;

         } );

        bTitle.innerHTML = currentBook.title;
        bAuthor.innerHTML = currentBook.author;
        bPages.innerHTML = currentBook.pages + " pages";
        bRead.innerHTML = currentBook.read;
        bTrash.innerHTML = '<i class="bi bi-trash"></i>';
        buttonRead.innerHTML = '<i class="bi bi-check-square-fill"></i>';

        buttonContainer.classList.add('flexTools');
        buttonContainer.append(bTrash);
        buttonContainer.append(buttonRead);

        bCard.append(bTitle);
        bCard.append(bAuthor);
        bCard.append(bPages);
        bCard.append(bRead);
        bCard.append(buttonContainer);
        
        grid.appendChild(bCard);
        
    }
}
function closeForm() {
    let formPage = document.querySelector("form");
    let formBackground = document.querySelector(".formContainer");
    formPage.classList.add("hide");
    formBackground.classList.remove("show");
    clearForm();
}
function clearForm() {
    document.forms["formInfo"].reset();
}
function openForm() {
    let formPage = document.querySelector("form");
    let backgroundForm = document.querySelector(".formContainer")
    formPage.classList.remove("hide");
    backgroundForm.classList.add("show");
}
const closeBtn = document.querySelector('.closeBtn');
closeBtn.addEventListener('click', () => {
    closeForm();
});

