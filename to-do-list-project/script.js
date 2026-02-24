document.addEventListener("DOMContentLoaded", () => {
  renderTaskList();
  const taskDescInput = document.getElementById("add-task-desc");
  const taskDateInput = document.getElementById("due-date");
  const taskTimeInput = document.getElementById("due-time");
  const addTaskBtn = document.getElementById("add-task");

  taskDateInput.setAttribute("min", new Date().toISOString().split("T")[0]);

  addTaskBtn.addEventListener("click", () => {
    const taskDesc = taskDescInput.value.trim();
    const taskDate = taskDateInput.value;
    const taskTime = taskTimeInput.value;

    if (taskDesc !== "" && taskDate !== "" && taskTime !== "") {
      handleAddTask(taskDesc, taskDate, taskTime);
      taskDescInput.value = "";
      taskDateInput.value = "";
      taskTimeInput.value = "";
    } else {
      document.getElementById("error-dialog").style.display = "flex";
    }
  });

  const searchInput = document.getElementById("search-tasks");
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim();
    sessionStorage.setItem("term", searchTerm);
    searchTask(searchTerm);
  });
});

const handleAddTask = (taskDesc, taskDate, taskTime) => {
  const task = {
    id: Date.now(),
    description: taskDesc,
    dueDate: taskDate,
    dueTime: taskTime,
    completed: false,
  };
  const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
  console.log(typeof tasksList);
  tasksList.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasksList));
  renderTaskList();
};

const renderTaskList = (list = null) => {
  const tasksList = list ?? (JSON.parse(localStorage.getItem("tasks")) || []);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueTasks = tasksList.filter((task) => new Date(task.dueDate) < today);
  const upcomingTasks = tasksList.filter(
    (task) => new Date(task.dueDate) >= today,
  );

  renderTask(dueTasks, "tasks", "No due tasks");
  renderTask(upcomingTasks, "upcoming-tasks", "No upcoming tasks");
};

const renderTask = (tasksList, containerId, emptyMessage) => {
  const tasksContainer = document.getElementById(containerId);
  tasksContainer.innerHTML = "";

  if (tasksList.length === 0) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.innerHTML = `<p>${emptyMessage}</p>`;
    tasksContainer.appendChild(taskItem);
    return;
  }

  tasksList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  tasksList.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.setAttribute("id", task.id);
    taskItem.innerHTML = `
       <h4 class="task-date">${task.dueDate}</h4>
            <div class="task-content">
              <p class="task-desc">
                ${task.description} at <span class="task-time">${task.dueTime}</span>
              </p>
              <div class="task-btns">
                <button class="task-edit" onclick="editTask(${task.id})">Edit</button>
                <button class="task-delete" onclick="deleteTask(${task.id})">Delete</button>
              </div>
      `;
    tasksContainer.appendChild(taskItem);
  });
};

const deleteTask = (id) => {
  let tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
  tasksList = tasksList.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasksList));
  searchTask(sessionStorage.getItem("term"));
};

const searchTask = (term) => {
  const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
  const filteredTasks = tasksList.filter((task) =>
    task.description.toLowerCase().includes(term.toLowerCase()),
  );
  renderTaskList(filteredTasks);
};

const editTask = (id) => {
  const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasksList.find((task) => task.id === id);

  if (task) {
    const taskDisplay = document.getElementById(task.id);
    taskDisplay.innerHTML = `
    <div class="save-task-background">
    <div class="save-task-container">
    <input type="text" id="edit-task-desc" value="${task.description}" autofocus>
    <input type="date" id="edit-due-date" value="${task.dueDate}">
    <input type="time" id="edit-due-time" value="${task.dueTime}">
    <button id="save-task" >Save</button>
    </div>
</div>
    `;
    const saveTaskBtn = document.getElementById("save-task");
    saveTaskBtn.addEventListener("click", () => {
      const taskDesc = document.getElementById("edit-task-desc").value.trim();
      const taskDate = document.getElementById("edit-due-date").value;
      const taskTime = document.getElementById("edit-due-time").value;

      if (taskDesc !== "" && taskDate !== "" && taskTime !== "") {
        task.description = taskDesc;
        task.dueDate = taskDate;
        task.dueTime = taskTime;
        localStorage.setItem("tasks", JSON.stringify(tasksList));
        searchTask(sessionStorage.getItem("term"));
      } else {
        document.getElementById("error-dialog").style.display = "flex";
        document.getElementById("error-dialog").style.zIndex = "1002";
      }
    });
  }
};
