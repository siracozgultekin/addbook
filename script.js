const title = document.querySelector("#titleId");
const author = document.querySelector("#authorId");
const ISBN = document.querySelector("#ISBNId");
const submitButton = document.querySelector("#submitId");
const form = document.querySelector("#formId");
const tbody = document.querySelector("tbody");
const rowList = document.querySelectorAll("tbody");

const displayItems = () => {
  const itemsfromstorage = getItemFromStorage();
  itemsfromstorage.forEach((item) => {
    const tr = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const tdAuthor = document.createElement("td");
    const tdISBN = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    // tdISBN.classList.add("lastData");
    tdTitle.textContent = item.title;
    tdAuthor.textContent = item.author;
    tdISBN.textContent = item.isbn;

    tr.innerHTML = `
    <td>${tdTitle.textContent}</td>
    <td>${tdAuthor.textContent}</td>
    <td class="lastData">${tdISBN.textContent}<button>${deleteButton.textContent}</button>
    </td>
  `;

    // tdISBN.appendChild(deleteButton);
    // tr.appendChild(tdTitle);
    // tr.appendChild(tdAuthor);
    // tr.appendChild(tdISBN);
    tbody.appendChild(tr);
    console.log("display item");
  });
};
//when clicked to submit button
const onSubmit = (e) => {
  e.preventDefault();
  //checking invalid input fields
  if (title.value === "" || author.value === "" || ISBN.value === "") {
    alert("Please fill all the fields");
  } else {
    //creating elements that will be added to html side
    const tr = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const tdAuthor = document.createElement("td");
    const tdISBN = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    tdISBN.classList.add("lastData");
    //assignin the values of inputs to created elements which will be added to html side
    tdTitle.textContent = form.elements["titleInp"].value;
    tdAuthor.textContent = form.elements["authorInp"].value;
    tdISBN.textContent = form.elements["ISBNInp"].value;
    tdISBN.appendChild(deleteButton);

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
};

const getItemFromStorage = () => {
  let itemsFromStorage;
  localStorage.getItem("rows") === null
    ? (itemsFromStorage = [])
    : (itemsFromStorage = JSON.parse(localStorage.getItem("rows")));
  return itemsFromStorage;
};

const addItemToStorage = (row) => {
  let itemsFromStorage = getItemFromStorage();

  itemsFromStorage.push(row);
  localStorage.setItem("rows", JSON.stringify(itemsFromStorage));
};
//to create addedNotification when an <tr> added to table
const addedNotification = () => {
  let notifyDiv = document.querySelector("#notificationDiv");
  let notification = document.createElement("p");
  notification.textContent = "Book Added!";
  notification.classList.add("notify");
  notifyDiv.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
};
const removedNotification = () => {
  let notifyDiv = document.querySelector("#notificationDiv");
  let notification = document.createElement("p");
  notification.textContent = "Book Removed!";
  notification.classList.add("notify");
  notifyDiv.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
};
//to clear inputfields after the submit
const clearInputs = () => {
  title.value = "";
  author.value = "";
  ISBN.value = "";
};
const removeItemFromStorage = (isbn) => {
  let itemsFromStorage = getItemFromStorage();

  itemsFromStorage = itemsFromStorage.filter((row) => row.isbn !== isbn);
  localStorage.setItem("rows", JSON.stringify(itemsFromStorage));
};

//To Remove chosen <tr> by using delete button
rowList.forEach((row) => {
  row.addEventListener("click", (e) => {
    if (e.target.nodeName == "BUTTON") {
      removeItemFromStorage(e.target.parentElement.childNodes[0].textContent);
      e.target.parentElement.parentElement.remove();
      removedNotification();
    }
  });
});

form.addEventListener("submit", onSubmit);
document.addEventListener("DOMContentLoaded", displayItems);
