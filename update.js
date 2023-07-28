const contact_name = document.getElementById("contact_name");
const contact_number = document.getElementById("contact_number");
const contact_email = document.getElementById("contact_email");
const contact_address = document.getElementById("contact_address");

function saveNewContact(newContact) {
    localStorage.setItem("contact_list", JSON.stringify(newContact));
}

function getPreviousContacts() {
    const jsonContacts = localStorage.getItem("contact_list");
    return jsonContacts ? JSON.parse(jsonContacts) : [];
}

function showContactDetails(contact) {
    if (contact) {
        contact_name.value = contact.data_contact_name;
        contact_number.value = contact.data_contact_number;
        contact_email.value = contact.data_contact_email;
        contact_address.value = contact.data_contact_address;
    } else {
        showContactElement.innerHTML =
            "<p>There is No Record with Provided Id</p>";
    }
}

function getContactFromLocalStorage(id) {
    const contactJson = localStorage.getItem("contact_list");
    const allContactArray = JSON.parse(contactJson);

    if (!allContactArray || allContactArray.length === 0) {
        return null; // Return null to indicate no task found
    }

    const contactDetail = allContactArray.find(
        (each_contact) => each_contact.id === parseInt(id)
    );
    return contactDetail;
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const contact_data = getContactFromLocalStorage(id);
    showContactDetails(contact_data);

    const update_contact = document.getElementById("update_contact");

    update_contact.addEventListener("click", (event) => {
        event.preventDefault();
        const contact_name_value = contact_name.value;
        const contact_number_value = contact_number.value;
        const contact_email_value = contact_email.value;
        const contact_address_value = contact_address.value;

        const previousContacts = getPreviousContacts();

        // Find the index of the contact to update in the array
        const contactIndexToUpdate = previousContacts.findIndex(
            (contact) => contact.id === parseInt(id)
        );

        if (contactIndexToUpdate !== -1) {
            // Update the contact details in the array
            previousContacts[contactIndexToUpdate].data_contact_name =
                contact_name_value;
            previousContacts[contactIndexToUpdate].data_contact_number =
                contact_number_value;
            previousContacts[contactIndexToUpdate].data_contact_email =
                contact_email_value;
            previousContacts[contactIndexToUpdate].data_contact_address =
                contact_address_value;

            saveNewContact(previousContacts);
            contact_name.value = "";
            contact_number.value = "";
            contact_email.value = "";
            contact_address.value = "";
            alert("Contact Updated Successfully");
            window.location.replace("/");
        } else {
            alert("Contact Not Found!");
        }
    });
});
