// Initialize data from localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];
let projects = JSON.parse(localStorage.getItem("projects")) || [];

// ---------- USERS ----------
function renderUsers() {
    const usersList = document.getElementById("users");
    usersList.innerHTML = "";
    const ownerSelect = document.getElementById("projectOwner");
    ownerSelect.innerHTML = "";

    users.forEach((user, index) => {
        // List of users
        const li = document.createElement("li");
        li.textContent = `${user.name} (${user.email})`;

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => {
            users.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(users));
            renderUsers();
            renderProjects();
        };
        li.appendChild(delBtn);
        usersList.appendChild(li);

        // Add to project owner dropdown
        const option = document.createElement("option");
        option.value = index;
        option.textContent = user.name;
        ownerSelect.appendChild(option);
    });
}

// Add user
document.getElementById("addUser").addEventListener("click", () => {
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    if (!name || !email) return alert("Enter name and email");
    users.push({ name, email });
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("userName").value = "";
    document.getElementById("userEmail").value = "";
    renderUsers();
});

// ---------- PROJECTS & TASKS ----------
function renderProjects() {
    const projectsList = document.getElementById("projects");
    projectsList.innerHTML = "";

    projects.forEach((project, pIndex) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${project.name}</strong> (Owner: ${users[project.owner]?.name || "N/A"})`;

        // Delete project
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete Project";
        delBtn.onclick = () => {
            projects.splice(pIndex, 1);
            localStorage.setItem("projects", JSON.stringify(projects));
            renderProjects();
        };
        li.appendChild(delBtn);

        // Task section
        const taskInput = document.createElement("input");
        taskInput.placeholder = "Task Name";
        const addTaskBtn = document.createElement("button");
        addTaskBtn.textContent = "Add Task";
        addTaskBtn.onclick = () => {
            const taskName = taskInput.value.trim();
            if (!taskName) return alert("Enter task name");
            const assignedTo = prompt("Assign to user index (0,1,...)") || null;
            project.tasks.push({ taskName, assignedTo, status: "Todo" });
            localStorage.setItem("projects", JSON.stringify(projects));
            renderProjects();
        };
        li.appendChild(document.createElement("br"));
        li.appendChild(taskInput);
        li.appendChild(addTaskBtn);

        // Show tasks
        if (project.tasks) {
            const taskList = document.createElement("ul");
            project.tasks.forEach((task, tIndex) => {
                const tLi = document.createElement("li");
                tLi.textContent = `${task.taskName} (Assigned to: ${users[task.assignedTo]?.name || "N/A"}) - ${task.status}`;

                // Complete task button
                const completeBtn = document.createElement("button");
                completeBtn.textContent = "Complete";
                completeBtn.onclick = () => {
                    task.status = "Done";
                    localStorage.setItem("projects", JSON.stringify(projects));
                    renderProjects();
                };

                // Delete task button
                const delTaskBtn = document.createElement("button");
                delTaskBtn.textContent = "Delete";
                delTaskBtn.onclick = () => {
                    project.tasks.splice(tIndex, 1);
                    localStorage.setItem("projects", JSON.stringify(projects));
                    renderProjects();
                };

                tLi.appendChild(completeBtn);
                tLi.appendChild(delTaskBtn);
                taskList.appendChild(tLi);
            });
            li.appendChild(taskList);
        }

        projectsList.appendChild(li);
    });

    // Update project owner dropdown in case users changed
    renderUsers();
}

// Add project
document.getElementById("addProject").addEventListener("click", () => {
    const name = document.getElementById("projectName").value.trim();
    const owner = parseInt(document.getElementById("projectOwner").value);
    if (!name || isNaN(owner)) return alert("Enter project name and select owner");
    projects.push({ name, owner, tasks: [] });
    localStorage.setItem("projects", JSON.stringify(projects));
    document.getElementById("projectName").value = "";
    renderProjects();
});

// Initial render
renderUsers();
renderProjects();
