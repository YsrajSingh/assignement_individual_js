function displayTask(task_object) {
    const taskDetailsDiv = document.getElementById("taskDetails");

    if (task_object) {
        const taskInfo = document.createElement("div");
        taskInfo.innerHTML = `
            <p><strong>ID:</strong> ${task_object.id}</p>
            <p><strong>Task Title:</strong> ${task_object.title}</p>
            <p><strong>Task Description:</strong> ${task_object.description}</p>
            <p><strong>Date Created:</strong> ${task_object.date}</p>
        `;
        taskDetailsDiv.appendChild(taskInfo);
    } else {
        taskDetailsDiv.innerHTML = "<p>No task found with the provided ID.</p>";
        setTimeout(() => {
            window.location.href = "./all.html";
        }, 2000);
    }
}

function getTaskFromLocalStorage(id) {
    const tasksJson = localStorage.getItem("all_tasks");
    const taskArray = JSON.parse(tasksJson);

    if (!taskArray || taskArray.length === 0) {
        window.location.href = "/add.html";
        return null; // Return null to indicate no task found
    }

    const task = taskArray.find((task) => task.id === parseInt(id));
    // alert(task);
    return task;
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    // Fetch existing tasks from local storage
    const taskObject = getTaskFromLocalStorage(id);
    displayTask(taskObject);
});
