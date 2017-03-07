var currentTab = 'all';



function add_element() { // create element function
    var textInput = document.getElementById("inputField").value; // get input value
        if (textInput.trim() !== '') {
            var li = document.createElement("LI"); // create <li> element
            li.className = "active";
            var checkbox = document.createElement("input"); // create <input> element
            checkbox.setAttribute("type", "checkbox"); // make input look like checkbox
            checkbox.setAttribute("onclick", "checkUncheck(this)")
            li.appendChild(checkbox); // insert checkbox into <li>
            var textnode = document.createTextNode(textInput); // create text node "textInput"
            li.appendChild(textnode); // insert text into <li>
            var remove = document.createElement("button"); // create <span> element
            var removeNode = document.createTextNode("x"); // create text node "x"
            remove.setAttribute("class", "removeBtn"); // add id to remove button
            remove.setAttribute("onclick", "remove_element(this)"); // set onclick function to remove button
            remove.appendChild(removeNode); // insert "x" into <span>
            li.appendChild(remove); // insert <span> into <li>
            document.getElementById("list").appendChild(li); // insert <li> into <ul>
            li.setAttribute("class", "active");
            document.getElementById("inputField").value = ''; // clear input field
            currentTab == 'completed' && li.setAttribute("style", "display: none"); // don't display new element on completed tab
        }
}

function remove_element(currentLi) { // remove element function
    var list = document.getElementById("list"); // select list
    var liToDelete = currentLi.parentNode; // select  <li>
    list.removeChild(liToDelete); // remove <li> from <list>
}

function checkUncheck(currentLi) {
    var liToCheck = currentLi.parentNode; // select li
    if (currentTab == 'all'){ // change text style when click on checkbox
        if (currentLi.checked){
            liToCheck.setAttribute("class", "completed");
        } else {
            liToCheck.setAttribute("class", "active");
        }
    } else if (currentTab == 'active'){
        if (currentLi.checked){
            liToCheck.setAttribute("class", "completed");
            liToCheck.setAttribute("style", "display: none");
         }
    }
    else if (currentTab == 'completed'){
        if (!currentLi.checked){
            liToCheck.setAttribute("class", "active");
            liToCheck.setAttribute("style", "display: none");
        }
    }
}

function show(status) {
    var ulist = document.getElementById("list");
    var allLi = ulist.getElementsByTagName('li');
    currentTab = status;
    for (var i = 0; i < allLi.length; i++){
        if (allLi[i].className !== status && status !== 'all'){
            allLi[i].setAttribute("style", "display: none")
        } else{
            allLi[i].setAttribute("style", "display: block")
        }
    }
}
