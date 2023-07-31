var title = document.querySelector("#titleId");
var author = document.querySelector("#authorId");
var ISBN = document.querySelector("#ISBNId");
var submitButton = document.querySelector("#submitId");
var form = document.querySelector("#formId");
var tbody = document.querySelector("tbody");
var rowList = document.querySelectorAll("tbody");

function displayItems() {
  const itemsfromstorage = getItemFromStorage();
  itemsfromstorage.forEach((item) => {
    var tr = document.createElement("tr");
    var tdTitle = document.createElement("td");
    var tdAuthor = document.createElement("td");
    var tdISBN = document.createElement("td");
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    tdISBN.classList.add("lastData");
    tdTitle.textContent = item.title;
    tdAuthor.textContent = item.author;
    tdISBN.textContent = item.isbn;
    tdISBN.appendChild(deleteButton);
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdISBN);
    tbody.appendChild(tr);
    console.log("display item");
  });
}
//when clicked to submit button
function onSubmit(e) {
  e.preventDefault();
  //checking invalid input fields
  if (title.value === "" || author.value === "" || ISBN.value === "") {
    alert("Please fill all the fields");
  } else {
    //creating elements that will be added to html side
    var tr = document.createElement("tr");
    var tdTitle = document.createElement("td");
    var tdAuthor = document.createElement("td");
    var tdISBN = document.createElement("td");
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    tdISBN.classList.add("lastData");
    //assignin the values of inputs to created elements which will be added to html side
    tdTitle.textContent = form.elements["titleInp"].value;
    tdAuthor.textContent = form.elements["authorInp"].value;
    tdISBN.textContent = form.elements["ISBNInp"].value;
    tdISBN.appendChild(deleteButton);
    // tr.appendChild(tdTitle);
    // tr.appendChild(tdAuthor);
    // tr.appendChild(tdISBN);
    // console.log(tr);
    // tbody.appendChild(tr);

    // class row {
    //   constructor(title, author, isbn) {
    //     this.title = title;
    //     this.author = author;
    //     this.isbn = isbn;
    //   }
    // }
    // const rowObject = new row(tdTitle, tdAuthor, tdISBN);
    const rowObject = {
      title: tdTitle.textContent,
      author: tdAuthor.textContent,
      isbn: tdISBN.childNodes[0].textContent,
    };
    addItemToStorage(rowObject);
    tbody.innerHTML = "";
    displayItems();
    clearInputs();
    addedNotification();
  }
}

function getItemFromStorage() {
  let itemsFromStorage = [];
  localStorage.getItem("rows") === null
    ? (itemsFromStorage = [])
    : (itemsFromStorage = JSON.parse(localStorage.getItem("rows")));
  return itemsFromStorage;
}

function addItemToStorage(row) {
  let itemsFromStorage = getItemFromStorage();

  itemsFromStorage.push(row);
  console.log(`itemsfromstorage${itemsFromStorage}`);
  localStorage.setItem("rows", JSON.stringify(itemsFromStorage));
}
//to create addedNotification when an <tr> added to table
function addedNotification() {
  var notifyDiv = document.querySelector("#notificationDiv");
  var notification = document.createElement("p");
  notification.textContent = "Book Added!";
  notification.classList.add("notify");
  notifyDiv.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
function removedNotification() {
  var notifyDiv = document.querySelector("#notificationDiv");
  var notification = document.createElement("p");
  notification.textContent = "Book Removed!";
  notification.classList.add("notify");
  notifyDiv.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
//to clear inputfields after the submit
function clearInputs() {
  title.value = "";
  author.value = "";
  ISBN.value = "";
}
function removeItemFromStorage(isbn) {
  let itemsFromStorage = getItemFromStorage();

  itemsFromStorage = itemsFromStorage.filter((row) => row.isbn !== isbn);
  localStorage.setItem("rows", JSON.stringify(itemsFromStorage));
}

//To Remove chosen <tr> by using delete button
rowList.forEach(function (row) {
  row.addEventListener("click", (e) => {
    console.log(e.target.nodeName);
    if (e.target.nodeName == "BUTTON") {
      e.target.parentElement.parentElement.remove();
      console.log(
        `butonun e.target.parentElement.childNodes[0] degeri : ${e.target.parentElement.childNodes[0].textContent}`
      );
      removeItemFromStorage(e.target.parentElement.childNodes[0].textContent);
      removedNotification();
    }
  });
});

form.addEventListener("submit", onSubmit);
document.addEventListener("DOMContentLoaded", displayItems);
