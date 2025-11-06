document.getElementById("addProject").addEventListener("click", function() {
    const projectName = document.getElementById("projectName").value;
    if(projectName === "") {
        alert("Please enter a project name");
        return;
    }

    const li = document.createElement("li");
    li.textContent = projectName;
    document.getElementById("projects").appendChild(li);

    document.getElementById("projectName").value = "";
});
