
testBook = new Book("Harry Potter","JK Rowling",400,false);
testBook2 = new Book("Game of Thrones","RR Martin",800,true);
testBook3 = new Book("Diary of A Wimpy Kid","Author",125,true);
let theLibrary = [testBook, testBook2,testBook3];
addBookToLibrary()
render()

function Book(title,author,noPages,isRead){
	this.title = title;
	this.author = author;
	this.noPages = noPages;
	this.isRead = isRead;
	
}

Book.prototype.info = function(){
    let readStr = "";
    if (this.isRead) readStr = "read";
    else readStr = "not read";
    return `${this.title} by ${this.author}, ${this.noPages} pages, ${readStr}` ;
}

function addBookToLibrary() {
    // at the moment take prompts
    let addBookBut = document.querySelector("#add-book-but");

    addBookBut.addEventListener('click',()=>{
        let title = document.querySelector("#book-title-input");
        let author = document.querySelector("#book-author-input");
        let noPages = document.querySelector("#book-pages-input");
        let readCheck = document.querySelector("#book-read-input");
        let isread;
        if (readCheck.checked){isread = true;}
        else isread = false;
        let userBook = new Book(title.value,author.value,noPages.value,isread);
        createTable(userBook);
        theLibrary.push(userBook);
        title.value = "";
        author.value = "";
        noPages.value = "";
        readCheck.checked = false;
    });

}

function createTable(book){
    bookDiv = document.querySelector("#books-div");

    bookTable = document.createElement('table');
    bookTable.classList.add("alert-light")
    bookTable.classList.add("table");
    bookTableBody = document.createElement('tbody');
    bookDiv.appendChild(bookTable);
    bookTable.appendChild(bookTableBody);
    
    //For the Title Row:
    rowTitle = document.createElement('tr');
    nameTitle = document.createElement("th");
    nameTitle.setAttribute('scope','row')
    nameTitle.textContent = "Title: ";
    //nameTitle.classList.add("col-sm-3");
    textTitle = document.createElement('td')
    textTitle.classList.add("text-center");
    textTitle.textContent = book.title;
    bookTableBody.appendChild(rowTitle);
    rowTitle.appendChild(nameTitle);
    rowTitle.appendChild(textTitle);

    //For the Author Row:
    authorRow = document.createElement('tr');
    authorName = document.createElement('th');
    authorName.setAttribute('scope','row');
    authorName.textContent = "Author: ";
    authorText = document.createElement('td');
    authorText.classList.add("text-center");
    authorText.textContent = book.author;
    bookTableBody.appendChild(authorRow);
    authorRow.appendChild(authorName);
    authorRow.appendChild(authorText);

    //For noOfPages Row:
    noPagesRow = document.createElement('tr');
    noPagesName = document.createElement('th');
    noPagesName.setAttribute('scope','row');
    noPagesName.textContent = "Number of pages: ";
    noPagesText = document.createElement('td');
    noPagesText.classList.add("text-center")
    noPagesText.textContent = book.noPages;
    bookTableBody.appendChild(noPagesRow);
    noPagesRow.appendChild(noPagesName);
    noPagesRow.appendChild(noPagesText);
    
    finalRow = document.createElement('tr');
    readButContainer = document.createElement('th');
    readButContainer.classList.add("text-center")
    readBut = document.createElement('button');
    deleteButContainer = document.createElement('th');
    deleteButContainer.classList.add("text-center")
    deleteBut = document.createElement('button');
    //deleteBut.textContent = "DELETE";
    deleteBut.classList.add("fas","fa-trash-alt","btn" , "btn-block","btn-warning","delete-but");
    
    if (book.isRead) {
        readBut.textContent = "READ";
        readBut.classList.add("btn", "btn-success","btn-block")
    } else {
        readBut.textContent = "NOT READ";
        readBut.classList.add("btn", "btn-danger","btn-block")
    }
    bookTableBody.appendChild(finalRow);
    finalRow.appendChild(readButContainer);
    readButContainer.appendChild(readBut);
    finalRow.appendChild(deleteButContainer);
    deleteButContainer.appendChild(deleteBut);

}

function render(){
   
    theLibrary.forEach(book=>{
        createTable(book);
    });
        
}