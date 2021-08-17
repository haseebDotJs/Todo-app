// localStorage.clear()
var button = document.getElementById("btn");
var field = document.getElementById("add");
var div = document.getElementById("list");
var reset = document.getElementById("reset");
let completedTasks = document.getElementById("completedItems")
var warn = "Enter a valid TODO item"


function listItems() {
  var firstItem = field.value;
  // console.log(field.value.match(/[\S]/g));
  let arrOfItems;
  let gettingItemsFromLS = localStorage.getItem("todoItem");
  if (gettingItemsFromLS === null) {
    arrOfItems = [];
  }
  else {
    arrOfItems = JSON.parse(gettingItemsFromLS)
  }
  // console.log(arrOfItems);
  arrOfItems.push(firstItem);
  field.value = "";
  localStorage.setItem("todoItem", JSON.stringify(arrOfItems))
  addItems(firstItem)
  return firstItem
}
const addItems = () => {
  let innerHtml = ""
  let arrOfItems;
  let gettingItemsFromLS = localStorage.getItem("todoItem")
  // console.log(gettingItemsFromLS);
  if (gettingItemsFromLS === null) {
    arrOfItems = []
  }
  else {
    arrOfItems = JSON.parse(gettingItemsFromLS);
  }
  //  console.log(arrOfItems);
  if (arrOfItems !== null && arrOfItems[0] !== undefined) {
    innerHtml = ""

    arrOfItems.forEach((item, index) => {
      // console.log("for each running", item);
      innerHtml += `<div class="new-list">
                           <li class="numbering">${index + 1}</li>
                           <li class="todo-item">${item}</li>
                           <input id="e${index}" class="edit-btn" onclick="editThis(this.id)" type="button" name="edit" value="Edit"/>
                           <button id="_${index}"class="check-btn" onclick="addToCompleted(this.id)"><i class="fas fa-check"></i></button>
                           <button id=${index} class="delete-btn" onclick="deleteItem(this.id)"><i class="fas fa-trash"></i></button>
                    </div>`
    })
  }

  div.innerHTML = innerHtml;
}

addItems()

button.addEventListener("click", function () {
  if (field.value.match(/[\S]/g) === null || ((field.value === "" || field.value === undefined || field.value === null))) {
    alert(warn);
  }
  else {
    listItems()
  }
})


field.addEventListener("keyup", function (e) {
  var code = e.keyCode;
  if (code === 13) {
    //  i++
    if (field.value.match(/[\S]/g) === null || ((field.value === "" || field.value === undefined || field.value === null))) {
      alert(warn);
    }
    else {
      listItems();
    }
  }
})


function deleteItem(e) {
  let value = e.slice(1,)
  console.log(e[0] === "-");
  //deleting parent of delet icon clicked 
  if (e[0] === "-") {
    console.log("if working");
    let gettingCompletedItemsFromLS = localStorage.getItem("completedItem")
    let deleting = JSON.parse(gettingCompletedItemsFromLS)
    deleting.splice(value, 1)
    localStorage.setItem("completedItem", JSON.stringify(deleting))
    addToDom()
  }
  else {
    console.log("else working");
    let gettingItemsFromLS = localStorage.getItem("todoItem");
    let deleting = JSON.parse(gettingItemsFromLS)
    deleting.splice(e, 1)
    console.log(deleting);
    localStorage.setItem("todoItem", JSON.stringify(deleting))
    addItems()
  }
}
function addToCompleted(e) {
  let gettingCompletedItemsFromLS = localStorage.getItem("completedItem");
  let savingCompleted
  if (gettingCompletedItemsFromLS === null) {
    savingCompleted = []
  }
  else {
    savingCompleted = JSON.parse(gettingCompletedItemsFromLS)
  }
  //  let checked_btn = document.getElementById(e)
  //  checked_btn.style.display = "none"
  let numberToRemove = e.charAt(e.length - 1)
  console.log("iam checking and removing number " + numberToRemove);
  let gettingItemsFromLS = localStorage.getItem("todoItem");
  let arrOfItems = JSON.parse(gettingItemsFromLS);
  savingCompleted.push(arrOfItems.splice(numberToRemove, 1)[0]);
  localStorage.setItem("todoItem", JSON.stringify(arrOfItems))
  addItems()
  console.log("savingCompleted ===>", savingCompleted);
  let complTasHead = document.getElementById("ctHeading")
  complTasHead.style.display = "block"
  console.log("iam removing ", savingCompleted)
  localStorage.setItem("completedItem", JSON.stringify(savingCompleted))
  addToDom()
}

let addToDom = () => {
  let complTasHead = document.getElementById("ctHeading");
  let completedTasks = document.getElementById("completedItems")
  let gettingCompletedItemsFromLS = localStorage.getItem("completedItem")
  let addingCompletedItemsToDom;
  console.log("completed ", addingCompletedItemsToDom);
  if (gettingCompletedItemsFromLS === null) {
    addingCompletedItemsToDom = []
  }
  else {
    addingCompletedItemsToDom = JSON.parse(gettingCompletedItemsFromLS)
  }
  let innerHtml = ""
  addingCompletedItemsToDom.forEach((item, index) => {
    innerHtml += `<div class="new-list completed">
                         <li class="numbering">${index + 1}</li>
                         <li class="todo-item">${item}</li>
                         <button id="-${index}" class="delete-btn" onclick="deleteItem(this.id)"><i class="fas fa-trash"></i></button>
                      </div>`
  })
  completedTasks.innerHTML = innerHtml;
  // console.log(innerHtml);
  // console.log(completedTasks.innerHTML === "");
  if (completedTasks.innerHTML === "") {
    complTasHead.style.display = "none"
  }
  else {
    complTasHead.style.display = "block"
  }
}
// whichIsHitting.parentNode.innerHTML += `<p class="undo" onclick="bringBack()">Undo</p>`
addToDom()

function editThis(e) {
  let value = e.slice(1,)
  if (field.value === '') {
    alert(warn)
  }
  else {
    let fieldVal = field.value
    let gettingItemsFromLS = localStorage.getItem("todoItem")
    let arrOfItems = JSON.parse(gettingItemsFromLS)
    arrOfItems.splice(value, 1, fieldVal)
    localStorage.setItem("todoItem", JSON.stringify(arrOfItems))
    field.value = ""
    addItems()
  }
}

reset.addEventListener("click", deleteAll)

function deleteAll() {
  div.innerHTML = ""
  localStorage.removeItem("todoItem")
}