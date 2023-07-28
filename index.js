function displayContacts(all_contacts) {
    const tableBody = document.querySelector("#contact_list tbody");
    tableBody.innerHTML = "";

    if (all_contacts.length === 0) {
        const newRow = tableBody.insertRow();
        const emptyCell = newRow.insertCell();
        emptyCell.textContent = "There are no contacts to display";
    } else {
        all_contacts.forEach((each_contact) => {
            const newRow = tableBody.insertRow();
            const contact_id_field = newRow.insertCell();
            const contact_name_field = newRow.insertCell();
            const contact_update_field = newRow.insertCell();
            const contact_delete_field = newRow.insertCell();
            contact_id_field.textContent = each_contact.id;

            const contact_link = document.createElement("a");
            contact_link.textContent = each_contact.data_contact_name;
            contact_link.href = `details.html?id=${each_contact.id}`;
            contact_name_field.appendChild(contact_link);

            contact_update_field.innerHTML = `<button onclick={window.location.href='/update.html?id=${each_contact.id}'} id='update_button' >Update Contact</button>`;
            contact_delete_field.innerHTML =
                "<button id='delete_button'>Delete Contact</button>";
        });
    }
}

function getPreviousContacts() {
    const jsonContacts = localStorage.getItem("contact_list");
    return jsonContacts ? JSON.parse(jsonContacts) : [];
}

function saveContactsToLocalStorage(contact_list) {
    localStorage.setItem("contact_list", JSON.stringify(contact_list));
}

document.addEventListener("DOMContentLoaded", () => {
    const contactArray = getPreviousContacts();
    displayContacts(contactArray);

    const deleteButtons = document.querySelectorAll("#delete_button");
    console.log(deleteButtons);

    deleteButtons.forEach((button, index) => {
        console.log(button, index);
        button.addEventListener("click", () => {
            const contactIdToDelete = contactArray[index].id;

            const updatedContactArray = contactArray.filter(
                (contact) => contact.id !== contactIdToDelete
            );

            saveContactsToLocalStorage(updatedContactArray);

            window.location.reload();
        });
    });
});
