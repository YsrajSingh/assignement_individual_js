function displayTasks(tasks) {
    const tableBody = document.querySelector("#taskTable tbody");
    tableBody.innerHTML = ""; // Clear existing content

    if (tasks.length === 0) {
        const newRow = tableBody.insertRow();
        const emptyCell = newRow.insertCell();
        emptyCell.textContent = "No data to display.";
    } else {
        tasks.forEach((task) => {
            const newRow = tableBody.insertRow();
            const taskNumberCell = newRow.insertCell();
            const taskTitleCell = newRow.insertCell();
            const dateAddedCell = newRow.insertCell();

            taskNumberCell.textContent = task.id;

            // Create anchor tag for task title to link to task details page
            const taskTitleAnchor = document.createElement("a");
            taskTitleAnchor.textContent = task.title;
            taskTitleAnchor.href = `task.html?id=${task.id}`; // Replace "task.html" with your task details page URL
            taskTitleCell.appendChild(taskTitleAnchor);

            dateAddedCell.textContent = task.date;
        });
    }
}

function getTasksFromLocalStorage() {
    const tasksJson = localStorage.getItem("all_tasks");
    return tasksJson ? JSON.parse(tasksJson) : [];
}

document.addEventListener("DOMContentLoaded", () => {
    // Fetch existing tasks from local storage
    const tasksArray = getTasksFromLocalStorage();
    displayTasks(tasksArray);
});
