function add_element() {
    var textInput = document.getElementById("inputField").value; // get input value
    var li = document.createElement("LI"); // create li element
    var textnode = document.createTextNode(textInput); // create text node
    li.appendChild(textnode); // insert text into <li>
    document.getElementById("list").appendChild(li); // insert li into ul
}