let 
boxs =document.querySelectorAll(".box"),
input = document.getElementById("currentTask"),
btn = document.getElementById("addCT"),
result = document.querySelector(".result"),
aSide = document.querySelector(".addTask"),
move=document.getElementById("move"),
tasks = document.querySelectorAll(".task"),
complete = document.querySelectorAll(".checkbox"),
update = document.querySelectorAll(".update"),
mydelete = document.querySelectorAll(".delete"),
btnMood="add",
moveMood="block",
drag=null
// localTask=JSON.parse(localStorage.localTask)||{
//     boxs_0:[],
//     boxs_1:[],
//     boxs_2:[],
//     boxs_3:[],
//     boxs_4:[]
// },
let LSTask;
if(localStorage.LSTask != undefined){
    
    LSTask=JSON.parse(localStorage.LSTask);
}else{
    LSTask=[];
    
}

boxs.forEach(box=>{
    LSTask.forEach(task=>{
        if(box.dataset.box==task.dataTask){
            mydiv = document.createElement("div");
        mydiv.draggable="true"
        mydiv.className = "task";
        
        mydiv.innerHTML=`
            <span class="complete">
            <input type="checkbox"  class="checkbox">
            </span>
            <p data-task="${task.dataTask}">${task.p}</p>
            <span class="update">u</span>
            <span class="delete">x</span>
        `;
        // dragItem()
        
        tasks = document.querySelectorAll(".task"),
        complete = document.querySelectorAll(".checkbox"),
        update = document.querySelectorAll(".update"),
        mydelete = document.querySelectorAll(".delete")
        box.appendChild(mydiv)
        dragItem();
        addTask();
        myDel()
        myUpdate()
        mycomplete()
        // dataLoc()
            
        }
    
    })
})



// function setLocalData(domBox,localBox){
//     localBox.forEach(b=>{
//         mydiv = document.createElement("div");
//         mydiv.draggable="true"
//         mydiv.className = "task";
        
//         mydiv.innerHTML=`
//             <span class="complete">
//             <input type="checkbox"  class="checkbox">
//             </span>
//             <p data-task="0">${b}</p>
//             <span class="update">u</span>
//             <span class="delete">x</span>
//         `;
//         // dragItem()
//         domBox.appendChild(mydiv)
//         dragItem();
//         addTask();
//         myDel()
//         myUpdate()
//         mycomplete()
//         dataLoc()
//     })
// }    

// setLocalData(boxs[0],localTask.boxs_0)
// setLocalData(boxs[1],localTask.boxs_1)
// setLocalData(boxs[2],localTask.boxs_2)
// setLocalData(boxs[3],localTask.boxs_3)
// setLocalData(boxs[4],localTask.boxs_4)

// console.log(boxs[0],localTask.boxs_0)
// console.log(boxs[1],localTask.boxs_1)
// console.log(boxs[2],localTask.boxs_2)
// console.log(boxs[3],localTask.boxs_3)
// console.log(boxs[4],localTask.boxs_4)
// dataLoc()
// function dataLoc(){
//     localTask={
//         boxs_0:[],
//         boxs_1:[],
//         boxs_2:[],
//         boxs_3:[],
//         boxs_4:[]
//     }
//     tasks = document.querySelectorAll(".task")
//     tasks.forEach(e=>{
//     // console.log(e.childNodes[3].innerHTML)
    
//     switch (+e.childNodes[3].dataset.task) {
//         case 0:
//             localTask.boxs_0.push(e.childNodes[3].innerHTML)
//             break;
//         case 1:
//             localTask.boxs_1.push(e.childNodes[3].innerHTML)
//             break;
//         case 2:
//             localTask.boxs_2.push(e.childNodes[3].innerHTML)
//             break;
//         case 3:
//             localTask.boxs_3.push(e.childNodes[3].innerHTML)
//             break;
//         case 4:
//             localTask.boxs_4.push(e.childNodes[3].innerHTML)
//             break;
    
//         default:
//             break;
//     }
//     })
// localStorage.localTask=JSON.stringify(localTask);
// }
// console.log(localTask)
addTask()
move.onclick = ()=>{
    if(moveMood=="block"){
    aSide.style.marginRight="-420px"
    move.style.left="-60px";
    moveMood="none"
    move.innerHTML="<<"
    }else{
        aSide.style.marginRight="0"
        move.style.left="-15px"
        moveMood="block"
        move.innerHTML=">>"
    }
}


function addTask(){
    btn.onclick = ()=>{
        if(input.value != ""){
            if(btnMood==="add"){
            mydiv = document.createElement("div");
            mydiv.draggable="true"
            mydiv.className = "task";
            
            mydiv.innerHTML=`
                <span class="complete">
                <input type="checkbox"  class="checkbox">
                </span>
                <p data-task="0">${input.value}</p>
                <span class="update">u</span>
                <span class="delete">x</span>
            `;
            // dragItem()
            input.value=""
            result.appendChild(mydiv)
                
        }else{
        let updateNow = document.querySelector(".updateNow")
        updateNow.classList.remove("updateNow")
        updateNow.style.opacity="1"
        updateNow.childNodes[3].innerHTML=input.value
            input.value=""
            btn.innerHTML="add task"
            btnMood="add"
    }
    tasks = document.querySelectorAll(".task"),
    complete = document.querySelectorAll(".checkbox"),
    update = document.querySelectorAll(".update"),
    mydelete = document.querySelectorAll(".delete")
    dragItem();
    addTask();
    myDel()
    myUpdate()
    mycomplete()
    restartTask()
    // dataLoc()
    }
    }
}
myDel()
// consol.log(mydelete)
function myDel(){
    mydelete.forEach(el=>{
        el.onclick = ()=>{
            el.parentElement.remove()
            console.log("before")
            restartTask()
            console.log("after")
        }
    })
}
myUpdate()
function myUpdate(){
    update.forEach(el=>{
        el.onclick = ()=>{
            // let children = parentElement.childNodes;  
            el.parentElement.classList.add("updateNow")
            el.parentElement.style.opacity="0.6"
            input.value=el.parentElement.childNodes[3].innerHTML
            input.focus()
            btn.innerHTML="update task"
            btnMood="update"
    }
})
}
let ex =0;
dragItem()
function dragItem(){
tasks = document.querySelectorAll(".task")
tasks.forEach(i=>{
// console.log("tasks")

    i.addEventListener("dragstart",()=>{
        ex=0;
        drag=i;
        i.style.opacity="0.6"
    })
    i.addEventListener("dragend",()=>{
        drag=null;
        i.style.opacity="1"
    })

    boxs.forEach((box)=>{
// console.log("boxs")

box.addEventListener("dragover",(e)=>{
    e.preventDefault()
    box.style.boxShadow="0 0 15px 15px #000"
    
})
box.addEventListener("dragleave",()=>{
    box.style.boxShadow="none"
    
})
box.addEventListener("drop",()=>{
            
            
    if(ex==0){
                drag.childNodes[3].dataset.task=box.dataset.box
                box.append(drag);
                
                box.style.boxShadow="none"
                // dataLoc()
                // console.log(JSON.parse(localStorage.localTask))
                // console.log(localTask)
                ++ex;

                restartTask()
            }

        })
    })
})
}
mycomplete()
function restartTask(){
    tasks = document.querySelectorAll(".task");
    LSTask=[]
    tasks.forEach(task=>{
        LSTask.push({
            "p":task.childNodes[3].innerHTML,
            "dataTask":task.childNodes[3].dataset.task
        })
    })
    console.log(LSTask)
    localStorage.LSTask=JSON.stringify(LSTask)
}
function mycomplete(){

    complete.forEach((e)=>{
        
        e.addEventListener("input",()=>{
            if(e.checked==true){
                e.parentElement.parentElement.classList.add("completeactev")
                console.log("added comp",e.parentElement.parentElement)
            }else{
                e.parentElement.parentElement.classList.remove("completeactev")

            }
        })
    })
}