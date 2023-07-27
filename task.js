const handleComplete = document.getElementById("complete");
const custom_footer = document.getElementById("custom_footer");

function displayTask(task_object) {
    const taskDetailsDiv = document.getElementById("taskDetails");

    if (task_object) {
        const taskInfo = document.createElement("div");
        if (task_object.status !== "Completed") {
            custom_footer.style.display = "block";
        }
        // custom_footer
        taskInfo.innerHTML = `
            <p><strong>ID:</strong> ${task_object.id}</p>
            <p><strong>Task Title:</strong> ${task_object.title}</p>
            <p><strong>Task Description:</strong> ${task_object.description}</p>
            <p><strong>Date Created:</strong> ${task_object.date}</p>
            <p><strong>Status:</strong> ${task_object.status}</p>
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

    handleComplete.addEventListener("click", () => {
        // Update the task status to Completed
        if (taskObject) {
            taskObject.status = "Completed";

            // Get the existing tasks from local storage
            const tasksJson = localStorage.getItem("all_tasks");
            const taskArray = JSON.parse(tasksJson);

            // Find the index of the task to update in the array
            const taskIndex = taskArray.findIndex(
                (task) => task.id === taskObject.id
            );

            // Update the task in the array
            if (taskIndex !== -1) {
                taskArray[taskIndex] = taskObject;

                // Save the updated task array back to local storage
                localStorage.setItem("all_tasks", JSON.stringify(taskArray));
            }
        }

        // Redirect to "all.html" to view all tasks
        window.location.href = "./all.html";
    });
});
