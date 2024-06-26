const myLibrary = [];
let bookID = 0; // This counter is outside the Book constructor

// //constructor for book
// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read ? "Read" : "Not Read"; // Using ternary operator
//   this.id = bookID++; // Assign the current index and then increment the counter
// }

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? "Read" : "Not Read";
    this.id = bookID++;
  }
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

  //add book to library list
  myLibrary.push(book);

  //remove no books in your library
  const empty_library = document.querySelector(".empty-library");
  empty_library.style.display = "none";

  addBookCard(book);

  //reset the values after submission
  book_name.value = ""; // Sets the book name to empty
  book_author.value = ""; // Sets the book author to empty
  page_num.value = ""; // Sets the number of pages to empty or a default value like '0'
  read_check.checked = false; // Unchecks the checkbox
}

function addBookCard(book) {
  //create elements to put in card
  const book_container = document.createElement("div");
  const title_heading = document.createElement("h1");
  const title_value = document.createElement("h2");
  const author_heading = document.createElement("h1");
  const author_value = document.createElement("h2");
  const pages_heading = document.createElement("h1");
  const pages_value = document.createElement("h2");
  const read_value = document.createElement("h2");
  const book_num = document.createElement("h1");

  const div_group1 = document.createElement("div");
  const div_group2 = document.createElement("div");
  const div_group3 = document.createElement("div");

  const remove_img = document.createElement("img");

  const remove_book = document.createElement("button");
  //need to iterate through the list of objects and delete the current containers and create the new container with updated book objects each time.

  title_heading.textContent = "Title of Book:";
  title_value.textContent = book.title;
  author_heading.textContent = "Author:";
  author_value.textContent = book.author;
  pages_heading.textContent = "# of Pages:";
  pages_value.textContent = book.pages;
  read_value.textContent = `Status: ${book.read}`;
  book_num.textContent = `Book ${myLibrary.indexOf(book) + 1}`;

  div_group1.appendChild(title_heading);
  div_group1.appendChild(title_value);
  div_group2.appendChild(author_heading);
  div_group2.appendChild(author_value);
  div_group3.appendChild(pages_heading);
  div_group3.appendChild(pages_value);
  div_group1.classList.add("book-card-group");
  div_group2.classList.add("book-card-group");
  div_group3.classList.add("book-card-group");
  read_value.classList.add("read-status");

  remove_img.src = "img/trash-can.svg";
  remove_img.alt = "Remove Book"; // Add an alt attribute for accessibility

  remove_book.dataset.bookId = book.id; // create dataset id for each book

  remove_book.addEventListener("click", removeBook);
  remove_book.appendChild(remove_img);
  remove_book.classList.add("removeBook");

  book_num.classList.add("book-num");

  book_container.appendChild(book_num);
  book_container.appendChild(div_group1);
  book_container.appendChild(div_group2);
  book_container.appendChild(div_group3);

  book_container.appendChild(read_value);
  book_container.appendChild(remove_book);
  book_container.classList.add("book-container");
  const library_container = document.querySelector(".library-container");

  library_container.appendChild(book_container);
}
const hideBtn = document.getElementById("hide-btn");
hideBtn.addEventListener("click", toggleFormVisibility);

function toggleFormVisibility(e) {
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

function removeBook(event) {
  const bookId = parseInt(event.currentTarget.dataset.bookId, 10); //convert dataset value to integer
  //when i click on button it should remove the book from the array by matching the dataset bookid with the array bookid
  //then splice that element when the index is found using the id
  const matchingIndex = myLibrary.findIndex((book) => book.id === bookId);

  if (matchingIndex > -1) {
    // Remove the book from the array
    myLibrary.splice(matchingIndex, 1);

    // Remove the book card from the UI
    event.currentTarget.closest(".book-container").remove();

    // Update the remaining book cards
    updateBookCards();
  }
  //then i need to update the DOM index's by querySelecting all the book-containers and changing the book num by targeting the .book-containers .book-num and changing the book num to be the same as the array index + 1
  const empty_library = document.querySelector(".empty-library");
  if (myLibrary.length == 0) {
    empty_library.style.display = "block";
  }
}

function updateBookCards() {
  // Select all elements with the class '.book-num'
  const bookNumElements = document.querySelectorAll(
    ".book-container .book-num"
  );

  // Iterate over each element and update its text content
  bookNumElements.forEach((item, index) => {
    item.textContent = `Book ${index + 1}`; // Update the book number
  });
}
