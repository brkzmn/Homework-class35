//cspell: disable
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-1-the-book-list

I'd like to display my three favorite books inside a nice webpage!

1. Iterate through the array of books.
2. For each book, create a `<p>`
element with the book title and author.
3. Use a `<ul>`  and `<li>` to display the books.
4. Add an `<img>` to each book that links to a URL of the book cover.
5. Change the style of the book depending on whether you have read it(green) or not(red).

The end result should look something like this:
https: //hyf-js2-week1-makeme-ex1-demo.herokuapp.com/

-----------------------------------------------------------------------------*/
//cspell: enable

function createBookList(books) {
  const myList = document.createElement("ul");
  myList.style.display = "flex";
  myList.style.listStyle = "none";
  myList.style.padding = "10px";

  books.forEach(book => {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = `${book.title} - ${book.author}`;
    const newBook = document.createElement("li");
    newBook.style.marginRight = "20px";
    newBook.appendChild(newParagraph);
    myList.appendChild(newBook);
    if (book.alreadyRead === true) {
      newBook.style.backgroundColor = "green";
    } else {
      newBook.style.backgroundColor = "red"
    }
  });

  const listItems = Array.from(myList.children);
  listItems.forEach(listItem => listItem.style.padding = "20px");

  const firstImage = document.createElement("img");
  firstImage.src = "./assets/the_design_of_everyday_things.jpg"
  firstImage.setAttribute("alt", "the design of everyday thins");
  myList.children[0].appendChild(firstImage);
  const secondImage = document.createElement("img");
  secondImage.src = "./assets/the_most_human_human.jpg"
  secondImage.setAttribute("alt", "the most human human");
  myList.children[1].appendChild(secondImage);
  const thirdImage = document.createElement("img");
  thirdImage.src = "./assets/the_pragmatic_programmer.jpg"
  thirdImage.setAttribute("alt", "the pragmatic programmer");
  myList.children[2].appendChild(thirdImage);

  return myList;
}

function main() {
  const myBooks = [
    {
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      isbn: '978-0465050659',
      alreadyRead: false,
    },
    {
      title: 'The Most Human Human',
      author: 'Brian Christian',
      isbn: '978-1617933431',
      alreadyRead: true,
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      isbn: '978-0201616224',
      alreadyRead: true,
    },
  ];

  const ulElement = createBookList(myBooks);
  document.querySelector('#bookList').appendChild(ulElement);
}

window.addEventListener('load', main);
