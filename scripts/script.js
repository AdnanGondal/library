
let theLibrary = [];
addBookToLibrary();
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

function render(){
   
    theLibrary.forEach(book=>{
        bookDiv = document.querySelector("#books-div");
        bookTable = document.createElement('table');
        bookTable.classList.add("table");
        bookTableBody = document.createElement('tbody');
        
        nameRow = document.createElement('tr');
        nameTitle = document.createElement("th");
        nameTitle.setAttribute('scope','row')
        nameTitle.textContent = "Name: ";

        bookDiv.appendChild(bookTable);
        bookTable.appendChild(bookTableBody);
        
        bookTableBody.appendChild(nameRow);
        nameRow.appendChild(nameTitle);
    });
}

