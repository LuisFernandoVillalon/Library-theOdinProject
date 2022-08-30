const Book = {
    title: "",
    author: "",
    pages: 0,
    read: false
}

function bookConstructor (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let myLibrary = [];

bookConstructor.prototype.deleteBook = function(index) {
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
   let newBook =  new bookConstructor(title, author, pages, read);
   myLibrary.push(newBook);
}

const addBookBtn = document.querySelector('.addBookBtn');

addBookBtn.addEventListener('click', () => {
    openForm();

    let formBackground = document.querySelector(".formContainer");
    formBackground.classList.add("show");

});

const submitBtn = document.querySelector('.submitBtn');
submitBtn.addEventListener('click', () => {
    let newTitle = document.getElementById("title");
    let newAuthor = document.getElementById("author");
    let newPages = document.getElementById("pages");
    let newRead = document.getElementById("read");
    addBookToLibrary(newTitle.value, newAuthor.value, newPages.value, newRead.checked);
    displayLoop();
    closeForm();
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

