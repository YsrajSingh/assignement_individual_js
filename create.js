const contact_name = document.getElementById("contact_name");
const contact_number = document.getElementById("contact_number");
const contact_email = document.getElementById("contact_email");
const contact_address = document.getElementById("contact_address");
const save_contact = document.getElementById("save_contact");

function saveNewContact(newContact) {
    localStorage.setItem("contact_list", JSON.stringify(newContact));
}

function getPreviousContacts() {
    const jsonContacts = localStorage.getItem("contact_list");
    return jsonContacts ? JSON.parse(jsonContacts) : [];
}

save_contact.addEventListener("click", (event) => {
    event.preventDefault();

    const contact_name_value = contact_name.value;
    const contact_number_value = contact_number.value;
    const contact_email_value = contact_email.value;
    const contact_address_value = contact_address.value;

    const previousContacts = getPreviousContacts();

    const last_contact_id =
        previousContacts.length > 0
            ? Math.max(...previousContacts.map((contact) => contact.id))
            : 0;

    const new_contact_id = last_contact_id + 1;
    // Add the new task to the array
    previousContacts.push({
        id: new_contact_id,
        data_contact_name: contact_name_value,
        data_contact_number: contact_number_value,
        data_contact_email: contact_email_value,
        data_contact_address: contact_address_value,
    });

    saveNewContact(previousContacts);

    contact_name.value = "";
    contact_number.value = "";
    contact_email.value = "";
    contact_address.value = "";
    alert("Contact Saved Successfully");

    window.location.replace("/");
});
