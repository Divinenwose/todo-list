const popUpContainer = document.getElementById("popup-container")
const container = document.getElementById("container")
const inputNote = document.getElementById("input-note")
const listContainer = document.getElementById("list-container")
const searchInput = document.getElementById("taskInput");
const selectBox = document.getElementById("select-box");
const detective = document.querySelector(".detective");
const overlay = document.getElementById("overlay")
const darkMode = localStorage.getItem("darkMode")
const body =document.body

function addPopUp(){
    overlay.style.display = "block"
    popUpContainer.style.display = "block"
}



function addNewNote(){
    if(inputNote.value === ''){
        alert("Input a Note!")
    }
    else{
        let list = document.createElement("li")
        list.innerText = inputNote.value
        listContainer.appendChild(list)

        let penIcon = document.createElement("span")
        penIcon.innerHTML = "&#x270E"
        penIcon.style.marginRight = "20px"
        penIcon.classList.add("edit-icon")
        list.appendChild(penIcon)

        let trashIcon = document.createElement("span")
        trashIcon.innerHTML = "&#x1F5D1"
        trashIcon.classList.add("delete-icon")
        list.appendChild(trashIcon)

        let hr = document.createElement("hr")
        listContainer.appendChild(hr)

    }
    inputNote.value = ""
    saveData()
}


function editTask(event){
    const listItem = event.target.parentElement
    const taskText = listItem.innerText

    const editedText = prompt("Edit the task:", taskText)
    
    if(editedText !== null && editedText !== ""){
        const editIcon = listItem.querySelector(".edit-icon").outerHTML
        const deleteIcon = listItem.querySelector(".delete-icon").outerHTML
        
        listItem.innerHTML = ""

        listItem.innerHTML = editedText + editIcon + deleteIcon
        saveData()
    }
}

function deleteTask(event){
    const listItem = event.target.parentElement
    const hrElement = listItem.nextElementSibling

    listItem.remove()
    hrElement.remove()
    saveData()
}

listContainer.addEventListener("click", function(e){
    if(e.target.classList.contains("edit-icon")){
        editTask(e)
    } else if(e.target.classList.contains("delete-icon")){
        deleteTask(e)
    }
})



listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked")
    }
    saveData()
})


searchInput.addEventListener("input", function() {
    const searchValue = searchInput.value.toLowerCase()
    const listItems = document.querySelectorAll("#list-container li")

    listItems.forEach(function(item) {
        const listItemText = item.innerText.toLowerCase()
        const hrElement = item.nextElementSibling

        if (listItemText.includes(searchValue)) {
            item.style.display = "block";
            hrElement.style.display = "block"
        } else {
            item.style.display = "none"
            hrElement.style.display = "none"
            detective.style.display = "block"
        }
    })
})


selectBox.addEventListener("change", function() {
    const selectedOption = selectBox.value

    const listItems = document.querySelectorAll("#list-container li")

    let showDetective = true

    listItems.forEach(function(item) {
        const isCompleted = item.classList.contains("checked")
        const hrElement = item.nextElementSibling

        if (selectedOption === "completed" && isCompleted) {
            item.style.display = "block"
            hrElement.style.display = "block"
            showDetective = false
        } else if (selectedOption === "incomplete" && !isCompleted) {
            item.style.display = "block"
            hrElement.style.display = "block"
            showDetective = false
        } else if (selectedOption === "all") {
            item.style.display = "block"
            hrElement.style.display = "block"
            showDetective = false
        } else {
            item.style.display = "none"
            hrElement.style.display = "none"
        }
    })

    if(showDetective){
        detective.style.display = "block"
    } else{
        detective.style.display = "none"
    }
    saveData()
})

if (darkMode === "true"){
    body.classList.add("dark-mode")
}

function changeColor(){
    body.classList.toggle("dark-mode")
    const isDarkMode = body.classList.contains("dark-mode")
    localStorage.setItem("darkMode", isDarkMode)
}


function saveData(){
    localStorage.setItem("data", listContainer.innerHTML)
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data")
}

showTask()
 



