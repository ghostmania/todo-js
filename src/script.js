function add_element() { // create element function
    var textInput = document.getElementById("inputField").value; // get input value
    var li = document.createElement("LI"); // create <li> element
    var checkbox = document.createElement("input"); // create <input> element
        checkbox.setAttribute("type", "checkbox"); // make input look like checkbox
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
    var list = document.getElementById("list");
    var liToDelete = currentLi.parentNode;
    list.removeChild(liToDelete);
}
