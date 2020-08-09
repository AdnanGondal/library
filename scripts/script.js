
let theLibrary = [];
render();
addBookToLibrary();



function Book(title,author,noPages,isRead){
	this.title = title;
	this.author = author;
	this.noPages = noPages;
	this.isRead = isRead;	
}


function render(){
    if(!localStorage.getItem('library')) {
        localStorage.setItem('library',JSON.stringify(theLibrary));
    } else theLibrary = JSON.parse(localStorage.getItem('library'));

   drawTable();

    deleteButs = document.querySelectorAll(".delete-but");
    tables = document.querySelectorAll(".book-table");
    deleteBook(deleteButs,tables);
    readButs = document.querySelectorAll(".read-but");
    toggleReadStatus(readButs);
    
}

function drawTable(){
    theLibrary.forEach((book,i)=>{
        createTable(book,i);
    });
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
        theLibrary.push(userBook);
        createTable(userBook,(theLibrary.length-1));
        title.value = "";
        author.value = "";
        noPages.value = "";
        readCheck.checked = false;
        deleteButs = Array.from(document.querySelectorAll(".delete-but"));
        tables = Array.from(document.querySelectorAll(".book-table"));
        //deleteButs = deleteButs.slice(-1);
        //tables = tables.slice(-1);
        deleteBook(deleteButs,tables);


        readButs = Array.from(document.querySelectorAll(".read-but"));
        //readButs = readButs.slice(-1);
        //console.log({readButs});
        toggleReadStatus(readButs);
        localStorage.setItem('library',JSON.stringify(theLibrary));
    });

}

function deleteBook(deleteButs,tables) {
    bookDiv = document.querySelector("#books-div");
    
    deleteButs.forEach((deleteButton,i)=>{
        
        deleteButton.addEventListener('click', (event)=>{
            theLibrary.splice(i,1);
            localStorage.setItem('library',JSON.stringify(theLibrary));
            location.reload();
            event.stopImmediatePropagation();
            return false;

        });
    });
}

function toggleReadStatus(readButs) {

        readButs.forEach((readBut,index)=>{
            readBut.addEventListener('click',(event)=>{

                console.log('button pressed');
                readBut.classList.toggle("btn-success");
                readBut.classList.toggle("btn-danger")

                theLibrary[index].isRead = !theLibrary[index].isRead;
                
                if (readBut.textContent=="NOT READ") readBut.textContent = "READ";
                else if (readBut.textContent == "READ") readBut.textContent = "NOT READ";

                readButs = document.querySelectorAll(".read-but");
                localStorage.setItem('library',JSON.stringify(theLibrary));

                event.stopImmediatePropagation();
            });
        });



}

function createTable(book,index){
    bookDiv = document.querySelector("#books-div");

    bookTable = document.createElement('table');
    bookTable.classList.add("table", "alert-light", "book-table");
    bookTable.setAttribute("data-index-number",`${index}`);
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
        readBut.classList.add("btn", "btn-success","btn-block","read-but")
    } else {
        readBut.textContent = "NOT READ";
        readBut.classList.add("btn", "btn-danger","btn-block","read-but")
    }
    bookTableBody.appendChild(finalRow);
    finalRow.appendChild(readButContainer);
    readButContainer.appendChild(readBut);
    finalRow.appendChild(deleteButContainer);
    deleteButContainer.appendChild(deleteBut);

}