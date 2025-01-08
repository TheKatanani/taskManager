// DOM Elements
const boxs = document.querySelectorAll(".box"),
    input = document.getElementById("currentTask"),
    btn = document.getElementById("addCT"),
    result = document.querySelector(".result"),
    aSide = document.querySelector(".addTask"),
    move = document.getElementById("move");

let btnMood = "add",
    moveMood = "block",
    drag = null,
    LSTask = JSON.parse(localStorage.LSTask || "[]");
document.getElementById("taskForm").onsubmit = (e) => {
    e.preventDefault(); // Prevent form reload
    const taskName = document.getElementById("currentTask").value.trim();

    if (taskName) {
        if (btnMood === "add") {
            const newTask = createTaskElement(taskName, "0");
            result.appendChild(newTask);
        } else {
            const updateNow = document.querySelector(".updateNow");
            if (updateNow) {
                updateNow.querySelector("p").innerHTML = taskName;
                updateNow.classList.remove("updateNow");
                updateNow.style.opacity = "1";
                btn.innerHTML = "add task";
                btnMood = "add";
            }
        }
        document.getElementById("currentTask").value = ""; // Clear the input field
        saveTasksToLocalStorage();
        attachEventListeners();
    }
};
// Initialize tasks from localStorage
function initializeTasks() {
    boxs.forEach(box => {
        LSTask.forEach(task => {
            if (box.dataset.box == task.dataTask) {
                const taskElement = createTaskElement(task.p, task.dataTask);
                box.appendChild(taskElement);
            }
        });
    });
    attachEventListeners();
}

// Create a task element
function createTaskElement(taskText, dataTask) {
    const taskDiv = document.createElement("div");
    taskDiv.draggable = true;
    taskDiv.className = "task";
    taskDiv.innerHTML = `
        <span class="complete">
            <input type="checkbox" class="checkbox">
        </span>
        <p data-task="${dataTask}">${taskText}</p>
        <span class="update">u</span>
        <span class="delete">x</span>
    `;
    return taskDiv;
}


// Delete a task
function deleteTask(deleteBtn) {
    const parentTask = deleteBtn.parentElement;
    if (!parentTask.classList.contains("updateNow")) {
        parentTask.remove();
        saveTasksToLocalStorage();
    } else {
        alert("Cannot delete a task while updating it.");
    }
}

// Update a task
function updateTask(updateBtn) {
    const parentTask = updateBtn.parentElement;
    parentTask.classList.add("updateNow");
    parentTask.style.opacity = "0.6";
    input.value = parentTask.querySelector("p").innerHTML;
    input.focus();
    btn.innerHTML = "update task";
    btnMood = "update";
}

// Save tasks to localStorage
function saveTasksToLocalStorage() {
    const tasks = document.querySelectorAll(".task");
    LSTask = Array.from(tasks).map(task => ({
        p: task.querySelector("p").innerHTML,
        dataTask: task.querySelector("p").dataset.task
    }));
    localStorage.LSTask = JSON.stringify(LSTask);
}

// Drag and drop functionality
function enableDragAndDrop() {
    boxs.forEach(box => {
        box.addEventListener("dragover", e => {
            e.preventDefault();
            box.style.boxShadow = "0 0 15px 15px #000";
        });
        box.addEventListener("dragleave", () => {
            box.style.boxShadow = "none";
        });
        box.addEventListener("drop", () => {
            if (drag) {
                drag.querySelector("p").dataset.task = box.dataset.box;
                box.appendChild(drag);
                box.style.boxShadow = "none";
                saveTasksToLocalStorage();
            }
        });
    });

    document.querySelectorAll(".task").forEach(task => {
        task.addEventListener("dragstart", () => {
            drag = task;
            task.style.opacity = "0.6";
        });
        task.addEventListener("dragend", () => {
            drag = null;
            task.style.opacity = "1";
        });
    });
}

// Attach event listeners to tasks
function attachEventListeners() {
    document.querySelectorAll(".delete").forEach(deleteBtn => {
        deleteBtn.onclick = () => deleteTask(deleteBtn);
    });

    document.querySelectorAll(".update").forEach(updateBtn => {
        updateBtn.onclick = () => updateTask(updateBtn);
    });

    document.querySelectorAll(".checkbox").forEach(checkbox => {
        checkbox.oninput = () => {
            const task = checkbox.closest(".task");
            task.classList.toggle("completeactev", checkbox.checked);
        };
    });

    enableDragAndDrop();
}

// Toggle sidebar
move.onclick = () => {
    if (moveMood === "block") {
        aSide.style.marginRight = "-420px";
        move.style.left = "-60px";
        move.innerHTML = "<<";
        moveMood = "none";
    } else {
        aSide.style.marginRight = "0";
        move.style.left = "-15px";
        move.innerHTML = ">>";
        moveMood = "block";
    }
};



initializeTasks();