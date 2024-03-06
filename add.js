// add.html
const task_title = document.getElementById("taskTitle");
const task_description = document.getElementById("taskDescription");
const save_task = document.getElementById("task_save");

// Function to fetch existing data from local storage and return as an array
function getTasksFromLocalStorage() {
    const tasksJson = localStorage.getItem("all_tasks");
    return tasksJson ? JSON.parse(tasksJson) : [];
}

// Function to save the array of tasks to local storage
function saveTasksToLocalStorage(tasksArray) {
    localStorage.setItem("all_tasks", JSON.stringify(tasksArray));
}

// Function to handle the button click and save the task
save_task.addEventListener("click", () => {
    const title_data = task_title.value;
    const description_data = task_description.value;
    let today = new Date().toLocaleDateString();

    // Fetch existing tasks from local storage
    const tasksArray = getTasksFromLocalStorage();
    // Find the maximum ID in the existing tasks (if any)
    const maxId =
        tasksArray.length > 0
            ? Math.max(...tasksArray.map((task) => task.id))
            : 0;

    // Increment the ID for the new task
    const newId = maxId + 1;
    // Add the new task to the array
    tasksArray.push({
        id: newId,
        title: title_data,
        description: description_data,
        date: today,
        status: "Pending",
    });

    // Save the updated array back to local storage
    saveTasksToLocalStorage(tasksArray);

    // Clear the input fields for the next entry
    task_title.value = "";
    task_description.value = "";
    window.location.replace("./all.html");
});
