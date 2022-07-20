var buttonSend = document.getElementById("send");
var buttonDel = document.getElementById("Delete");
var myEntry = document.getElementById("entry");
var myToDo = document.getElementById("toDo");

document.addEventListener("click", clickOnPage);
myEntry.addEventListener("keydown", keyPressEntry);

paddingInput();

function clickOnPage(e)
{
    var elem = e.target;
    
    if (elem.className === "fa-regular fa-trash-can fa-lg"){ //Remove the task from the page
        elem.parentNode.remove();
        paddingInput();
    }

    else if (elem.className === "fa-regular fa-circle-check fa-lg"){ //Validate the task
        validateTask(elem.parentNode);
    }

    else if (elem.id === "send"){ //Add task on the page
        addToDo();
        
    }

    else if (elem.id === "deleteAll"){ //Remove all the task
        while (myToDo.firstChild){
            myToDo.removeChild(myToDo.firstChild);
            myEntry.value = null;
            paddingInput();
        }
    }
}


function addToDo ()
{
    var userEntry = myEntry.value; //Get entry 
    myEntry.value = null; //Clear entry

    if (userEntry == '') { //Abort the function if the entry value is empty
        return;
    }

    var myNewName = document.createElement('p'); //Create the task
    myNewName.innerText = userEntry;

    var myNewValButton = document.createElement("i") //Create validate button
    myNewValButton.setAttribute("class", "fa-regular fa-circle-check fa-lg");

    var myNewDelButton = document.createElement("i"); //Create delete button
    myNewDelButton.setAttribute("class", "fa-regular fa-trash-can fa-lg");

    myNewName.appendChild(myNewDelButton); //Create the node
    myNewName.appendChild(myNewValButton);
    myToDo.appendChild(myNewName); //Add the node at myToDo

    paddingInput();
}

function keyPressEntry(e) //Send task if the user press enter
{
    if (e.keyCode === 13){
        addToDo();
    }
    console.log(myToDo.childNodes);
}

function paddingInput () // Place the input field
{
    if (myToDo.childNodes.length > 0)
    {
        myEntry.style.alignSelf = 'flex-start';
        myEntry.style.marginLeft= '1rem';7
    }
    else
    {
        myEntry.style.alignSelf = 'center';
        myEntry.style.marginLeft = '0';
    }
}

function validateTask (task)
{
    if (task.innerHTML.slice(0, 5) === "<del>") //Check if the task if already validate
    {
        let closeDel = task.innerHTML.search("</del"); //Closing tag
        console.log(closeDel);
        task.innerHTML = task.innerHTML.slice(5, closeDel) + task.innerHTML.slice(closeDel + 6);
    }

    else
    {
        let endtask = task.innerHTML.search("<i"); //End of the task
        task.innerHTML = "<del>" + task.innerHTML.slice(0, endtask) + "</del>" + task.innerHTML.slice(endtask);
    }
}
