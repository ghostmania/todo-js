var currentTab = 'all';

function add_element_on_enter(e) { // add element on Enter
    if (e.keyCode == 13) {
        add_element();
    }
}


function add_element() { // create element function
    var textInput = document.getElementById("inputField").value; // get input value
        if (textInput.trim() !== '') {
            var li = document.createElement("LI"); // create <li> element
            // li.className = "active";
            var checkbox = document.createElement("input"); // create <input> element
            checkbox.setAttribute("type", "checkbox"); // make input look like checkbox
            checkbox.setAttribute("onclick", "checkUncheck(this)");
            li.appendChild(checkbox); // insert checkbox into <li>
            var span = document.createElement("span"); // create span
            span.setAttribute("ondblclick", "edit(this)"); // attach edit function to created span
            span.setAttribute("class", "active");
            li.appendChild(span); // insert checkbox into <li>
            var textnode = document.createTextNode(textInput); // create text node "textInput"
            span.appendChild(textnode); // insert text into <span>
            var edit_input = document.createElement('input'); // create input for edit
            edit_input.setAttribute("style", "display: none"); // hide edit input
            edit_input.setAttribute("class", "edit"); // attach class to edit input
            edit_input.setAttribute("onkeypress", "edited_value(event)");
            li.appendChild(edit_input); // insert checkbox into <li>
            var remove = document.createElement("button"); // create <button> element
            var removeNode = document.createTextNode("x"); // create text node "x"
            remove.setAttribute("class", "removeBtn"); // add id to remove button
            remove.setAttribute("onclick", "remove_element(this)"); // set onclick function to remove button
            remove.appendChild(removeNode); // insert "x" into <button>
            li.appendChild(remove); // insert <button> into <li>
            document.getElementById("list").appendChild(li); // insert <li> into <ul>
            // li.setAttribute("class", "active");
            document.getElementById("inputField").value = ''; // clear input field
            currentTab == 'completed' && li.setAttribute("style", "display: none"); // don't display new element on completed tab
            inputField.focus(); // focus input after adding element
        }
}

function remove_element(currentLi) { // remove element function
    var list = document.getElementById("list"); // select list
    var liToDelete = currentLi.parentNode; // select  <li>
    list.removeChild(liToDelete); // remove <li> from <list>
}

function checkUncheck(currentLi) { //click on checkbox
    var li_children = currentLi.parentNode.children; // select li
    for (var i = 0; i < li_children.length; i++) {
        if (li_children[i].tagName == 'SPAN') {
            var spanToCheck = li_children[i];
            if (currentTab == 'all'){ // change text style when click on checkbox
                if (currentLi.checked){
                    spanToCheck.setAttribute("class", "completed");
                } else {
                    spanToCheck.setAttribute("class", "active");
                }
            } else if (currentTab == 'active'){
                if (currentLi.checked){
                    spanToCheck.setAttribute("class", "completed");
                    li_children.setAttribute("style", "display: none");
                }
            }
            else if (currentTab == 'completed'){
                if (!currentLi.checked){
                    spanToCheck.setAttribute("class", "active");
                    li_children.setAttribute("style", "display: none");
                }
            }
        }
    }
}

function show(status) { // display statuses
    var ulist = document.getElementById("list");
    var allLi = ulist.getElementsByTagName('li');
    currentTab = status;
    for (var i = 0; i < allLi.length; i++){
        if (allLi[i].getElementsByTagName('span')[0].className !== status && status !== 'all'){
            allLi[i].setAttribute("style", "display: none")
        } else{
            allLi[i].setAttribute("style", "display: block")
        }
    }
}

function edit(e) { // click on input to change it's value
    var children = e.parentNode.children; // find li for edit
    for (var i = 0; i < children.length; i++){
        if (children[i].className == 'edit') {
            children[i].setAttribute("style", "display: inline-block"); // show edit input
            children[i].value = e.textContent; // insert <span> value to input
            children[i].focus();
            e.setAttribute("style", "display: none");  // hide span
        }
    }
 }

function edited_value(e) {
    if (e.keyCode == 13) {
        var children = e.target.parentNode.children; // find li for edit
        for (var i = 0; i < children.length; i++){
            if (children[i].tagName == 'SPAN') {
                children[i].setAttribute("style", "display: inline-block"); // show edited <span>
                children[i].textContent = e.target.value; // insert <input> value to <span>
                e.target.setAttribute("style", "display: none");  // hide <input>
            }
        }

    }
}

