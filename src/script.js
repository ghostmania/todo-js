var currentTab = 'all';
var all = document.getElementById('all');
var active = document.getElementById('active');
var completed = document.getElementById('completed');
var page_qty = 1;
var currentPage = 1;
var actualList = [];
var list = document.getElementById('list');
var buttons = document.getElementById('buttons');
document.getElementById("inputField").focus(); // focus input after adding element

window.onload = function () {
    if (list.children.length > 0){ // if list isn't empty
       page_qty = Math.ceil(list.children.length / 3); // count pages
    }
    iterateCreatePages();
};

function iterateCreatePages(){ // create pages according to elements count
    for (var i = 0; i < page_qty; i++){
        var new_btn = document.createElement('button');
        buttons.appendChild(new_btn);
        new_btn.innerHTML = (i + 1).toString() ; // give values to buttons
        new_btn.setAttribute('onclick', 'showPage('+(i+1)+')'); // show elements on first page
    }
}

function showPage(pageQty) {
    currentPage = pageQty;
    showItemsPerPage(currentTab);
}

function add_element_on_enter(pressedBtn) { // add element on Enter
    if (pressedBtn.keyCode == 13) {
        add_element();
    }
}

function add_element() { // create element function
    var textInput = document.getElementById("inputField").value; // get input value
    if (textInput.trim() !== '') {
        var li = document.createElement("LI"); // create <li> element
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
        remove.setAttribute("class", "removeBtn"); // add id to remove button
        remove.setAttribute("onclick", "remove_element(this)"); // set onclick function to remove button
        remove.textContent = "x";
        li.appendChild(remove); // insert <button> into <li>
        list.appendChild(li); // insert <li> into <ul>
        document.getElementById("inputField").value = ''; // clear input field
        currentTab == 'completed' && li.setAttribute("style", "display: none"); // don't display new element on completed tab
        document.getElementById("inputField").focus(); // focus input after adding element
        all.textContent = Number(all.textContent) + 1; // change number of all elements
        active.textContent = Number(active.textContent) + 1; // change number of active elements
        showItemsPerPage(currentTab);
        page_qty = Math.ceil(actualList.length / 3); // count pages
        if (page_qty > buttons.children.length){ // if there are more then  3 elements in list, create new page
            var new_btn = document.createElement('button');
            new_btn.innerHTML = page_qty.toString();
            buttons.appendChild(new_btn);
            new_btn.setAttribute('onclick', 'showPage('+page_qty+')'); // show elements according to current page
        }
    }
}

function nextPage() { // change page when press ">"
    if (currentPage != buttons.children.length ) {
        currentPage = currentPage + 1;
        showItemsPerPage(currentTab);
    }
}

function prevPage() { // change page when press "<"
    if (currentPage != 1) {
        currentPage = currentPage - 1;
        showItemsPerPage(currentTab);
    }
}

function showItemsPerPage(tab) {
    actualList = [];
    if (tab != 'all') {
        for (var i = 0; i < list.children.length; i++) {
            list.children[i].setAttribute('style', 'display: none');
            if (list.children[i].getElementsByTagName('span')[0].className == tab) {
                actualList.push(list.children[i]);
             }
        }
    }
    else{
        actualList = list.children;
    }
    for (var a = 0; a < actualList.length; a++){
        (currentPage * 3 - 3) <= a && a <= (currentPage * 3 - 1) ?
            actualList[a].setAttribute('style', 'display: block') :
            actualList[a].setAttribute('style', 'display: none');
    }
}

function remove_element(currentLi) { // remove element function
    var liToDelete = currentLi.parentNode; // select  <li>
    list.removeChild(liToDelete); // remove <li> from <list>
    all.textContent = Number(all.textContent) - 1; // change number of all elements on delete
    showItemsPerPage(currentTab); // recount elements when deleted

    for(var i = 0; i < liToDelete.childElementCount; i++) {
        if (liToDelete.children[i].className == 'active') {
             active.textContent = Number(active.textContent) - 1; // change number of active elements on delete
        }
        else if (liToDelete.children[i].className == 'completed'){
             completed.textContent = Number(completed.textContent) - 1; // change number of completed elements on delete
        }
    }
    if (list.children.length > 0) { // recount page qty to prevent 0 pages
        page_qty = Math.ceil(list.children.length / 3); // count pages
    }
    if (page_qty < buttons.children.length){ // if there are more then  3 elements in list, create new page
        var lbtn = buttons.children[buttons.children.length - 1]; // find last btn
        buttons.removeChild(lbtn); // remove last btn
    }
    recountPages(); // recount pages 
    if(currentPage > buttons.children.length){ // if there is no such page
       currentPage = buttons.children.length; // change page to last page
    }
    showItemsPerPage(currentTab); // show items for current page
}

function checkUncheck(currentLi) { //click on checkbox
    var li_children = currentLi.parentNode.children; // select li
    for (var i = 0; i < li_children.length; i++) {
        if (li_children[i].tagName == 'SPAN') {
            var spanToCheck = li_children[i];
            if (currentTab == 'all'){ // change text style when click on checkbox on all tab
                if (currentLi.checked){
                    spanToCheck.setAttribute("class", "completed");
                    checked();
                } else {
                    spanToCheck.setAttribute("class", "active");
                    unchecked();
                }
            } else if (currentTab == 'active'){ // change text style when click on checkbox on active tab
                if (currentLi.checked){
                    spanToCheck.setAttribute("class", "completed");
                    currentLi.parentNode.setAttribute("style", "display: none");
                    checked();
                }
            }
            else if (currentTab == 'completed'){ // change text style when click on checkbox on completed tab
                if (!currentLi.checked){
                    spanToCheck.setAttribute("class", "active");
                    currentLi.parentNode.setAttribute("style", "display: none");
                    unchecked();
                }
            }
        }
    }
    function checked(){ // change number of completed tasks when click on checkbox
        completed.textContent = Number(completed.textContent) + 1; // change number of completed elements on delete
        active.textContent = Number(active.textContent) - 1; // change number of active elements on delete
    }
    function unchecked(){
        completed.textContent = Number(completed.textContent) - 1; // change number of completed elements on delete
        active.textContent = Number(active.textContent) + 1; // change number of active elements on delete
    }
    showItemsPerPage(currentTab); // recount elements on page after changing status
    recountPages(); // recount pages after recounting elements
    if (currentPage > buttons.children.length) { // if current page doesn't exist
        currentPage = buttons.children.length; // set current page to last  
        showItemsPerPage(currentTab); // show items for current page
    }
}

function recountPages() {
    while (buttons.firstChild) {
        buttons.removeChild(buttons.firstChild);
    }
    actualList.length == 0 ? page_qty = 1 : page_qty = Math.ceil(actualList.length / 3);
    iterateCreatePages();

}

function show(status) { // display statuses
    currentTab = status;
    currentPage = 1;
    showItemsPerPage(currentTab);
    recountPages();
    for(i = 0; i < document.getElementsByClassName('statusTabs').length; i++) { // change butons color to defaults
        document.getElementsByClassName('statusTabs')[i].setAttribute('style', 'background-color: whitesmoke');
        if (status == 'all') { // change button color when click All button
        document.getElementsByClassName('statusTabs')[0].setAttribute('style', 'background-color: chartreuse');
        } else if (status == 'active') { // change button color when click active button
            document.getElementsByClassName('statusTabs')[1].setAttribute('style', 'background-color: chartreuse');
        } else { // change button color when click completed button
            document.getElementsByClassName('statusTabs')[2].setAttribute('style', 'background-color: chartreuse');
        }
    }
}

function edit(liToEdit) { // click on input to change it's value
    var children = liToEdit.parentNode.children; // find li for edit
    for (var i = 0; i < children.length; i++){
        if (children[i].className == 'edit') {
            liToEdit.parentNode.getElementsByTagName("input")[0].setAttribute("style", "display: none"); // hide checkbox
            liToEdit.parentNode.getElementsByTagName("button")[0].setAttribute("style", "display: none"); // hide remove btn
            liToEdit.setAttribute("style", "display: none");  // hide span
            children[i].setAttribute("style", "display: inline-block"); // show edit input
            children[i].value = liToEdit.textContent; // insert <span> value to input
            children[i].focus();
        }
    }
 }

function edited_value(editedLi) {
    if (editedLi.keyCode == 13) {
        var children = editedLi.target.parentNode.children; // find li children for edit
        for (var i = 0; i < children.length; i++){
            if (children[i].tagName == 'SPAN') {
                children[i].setAttribute("style", "display: inline-block"); // show edited <span>
                children[i].textContent = editedLi.target.value; // insert <input> value to <span>
                editedLi.target.setAttribute("style", "display: none");  // hide <input>
                editedLi.target.parentNode.getElementsByTagName("input")[0].setAttribute("style", "display: inline-block"); // hide checkbox
                editedLi.target.parentNode.getElementsByTagName("button")[0].setAttribute("style", "display: inline-block"); // hide remove btn
            }
        }
    }
}

