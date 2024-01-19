const myLibrary = [];
let bookIndex = 0; // This counter is outside the Book constructor

//constructor for book
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read ? "Read" : "Not Read"; // Using ternary operator
  this.index = bookIndex++; // Assign the current index and then increment the counter
}

const bookForm = document.getElementById("book-input");
bookForm.addEventListener("submit", addBookToLibrary);

function addBookToLibrary(e) {
  e.preventDefault();
  const book_name = document.getElementById("book_name");
  const book_author = document.getElementById("book_author");
  const page_num = document.getElementById("page_num");
  const read_check = document.getElementById("read_check");

  //create book object to store books for library
  const book = new Book(
    book_name.value,
    book_author.value,
    page_num.value,
    read_check.checked
  );

  console.log(book.title, book.author, book.pages, book.read, book.index);

  //add book to library list
  myLibrary.push(book);

  addBookCard(book);

  //reset the values after submission
  book_name.value = ""; // Sets the book name to empty
  book_author.value = ""; // Sets the book author to empty
  page_num.value = ""; // Sets the number of pages to empty or a default value like '0'
  read_check.checked = false; // Unchecks the checkbox

  //create book card

  console.log(myLibrary);
}

function addBookCard(book) {
  //create elements to put in card
  const book_container = document.createElement("div");
  const title_heading = document.createElement("h1");
  const author_heading = document.createElement("h1");
  const pages_heading = document.createElement("h1");
  const read_heading = document.createElement("h1");

  title_heading.textContent = book.title;
  author_heading.textContent = book.author;
  pages_heading.textContent = book.pages;
  read_heading.textContent = book.read;

  book_container.appendChild(title_heading);
  book_container.appendChild(author_heading);
  book_container.appendChild(pages_heading);
  book_container.appendChild(read_heading);

  const library_container = document.querySelector(".library-container");

  library_container.appendChild(book_container);
}
const hideBtn = document.getElementById("hide-btn");
hideBtn.addEventListener("click", hideAndshow);

function hideAndshow(e) {
  const input_groups = document.querySelectorAll(".input-group");
  const submit = document.querySelector("#submit");

  if (e.target.value == "Hide") {
    e.target.value = "Show";
    input_groups.forEach((input_group) => {
      input_group.style.display = "none";
    });
    submit.style.display = "none";
  } else {
    e.target.value = "Hide";
    input_groups.forEach((input_group) => {
      input_group.style.display = "flex";
    });
    submit.style.display = "block";
  }
}
