
testBook = new Book("Harry Potter","JK Rowling",400,false);
testBook2 = new Book("Game of Thrones","RR Martin",800,true);
testBook3 = new Book("Diary of A Wimpy Kid","Author",125,true);
let theLibrary = [testBook, testBook2,testBook3];
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
    let userBook = new Book(prompt("Enter Book name: "),prompt("Enter Author"),prompt("Enter no of pages"),prompt("Enter read status"));
    theLibrary.push(userBook);
}

function createTable(book){
    bookDiv = document.querySelector("#books-div");

    bookTable = document.createElement('table');
    bookTable.classList.add("table","table-bordered");
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
    readBut = document.createElement('button');
    if (book.isRead) {
        readBut.textContent = "READ";
        readBut.classList.add("btn", "btn-success")
    } else {
        readBut.textContent = "NOT READ";
        readBut.classList.add("btn", "btn-danger")
    }
    bookTableBody.appendChild(finalRow);
    finalRow.appendChild(readBut);

}

function render(){
   
    theLibrary.forEach(book=>{
        createTable(book);
    });
        
}