function add_element() { // create element function
    var textInput = document.getElementById("inputField").value; // get input value
    var li = document.createElement("LI"); // create <li> element
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
}

function remove_element(currentLi) { // remove element function
    var list = document.getElementById("list"); // select list
    var liToDelete = currentLi.parentNode; // select  <li>
    list.removeChild(liToDelete); // remove <li> from <list>
}

function checkUncheck(currentLi) {
    var liToCheck = currentLi.parentNode; // select li
    // var checkbox = currentLi.previousElementSibling;
    // console.log(currentLi);
    // console.log(currentLi.checked);
    if (currentLi.checked == true){
        liToCheck.setAttribute("style", "text-decoration: line-through")
    }
    else{
        liToCheck.setAttribute("style", "text-decoration: ''")
    }
}