const myLibrary = [];

//constructor for book
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const bookForm = document.getElementById("book-input");
bookForm.addEventListener("submit", addBookToLibrary);

function addBookToLibrary(e) {
  e.preventDefault();
  const book_name = document.getElementById("book_name");
  const book_author = document.getElementById("book_author");
  const page_num = document.getElementById("page_num");
  const read_check = document.getElementById("read_check");

  const book = new Book(
    book_name.value,
    book_author.value,
    page_num.value,
    read_check.checked
  );

  console.log(book.title, book.author, book.pages, book.read);
}
