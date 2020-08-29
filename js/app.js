//select element atau memilih element yang akan dimanipulasi
const clear = document.querySelector(".clear");
const dataElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
let LIST, id;

// get item from local storange
let data = localStorage.getItem("TODO");

//
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    //
    LIST = [];
    id = 0;
}

//
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-us", options);

//add to do function 4

function addToDo(toDo, id, done, trash){

    if(trash){return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item>
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id"${id}"></i>
                  </li>
                  `;

    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// add an item to the list user the the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;

        //if the{ input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);

            ListeningStateChangedEvent.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            // add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//

list.addEventListener("click", function(event){
    const element = event.target;
    const elementjob = element.attributes.job.value;

    if(elementjob == "complete"){
        completeToDo(element);
    }else if(elementjob == "delete"){
        removeToDo(element);
    }

    //
    localStorage.setItem("TODO", JSON.stringify(LIST));
});