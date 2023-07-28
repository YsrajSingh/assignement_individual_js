const handleComplete = document.getElementById("complete");
const custom_footer = document.getElementById("custom_footer");

function showContactDetails(contact) {
    const showContactElement = document.getElementById("contact_description");

    const contactNameCell = document.getElementById("contactName");
    const contactPhoneNumberCell =
        document.getElementById("contactPhoneNumber");
    const contactEmailAddressCell = document.getElementById(
        "contactEmailAddress"
    );
    const contactAddressCell = document.getElementById("contactAddress");

    if (contact) {
        contactNameCell.textContent = contact.data_contact_name;
        contactPhoneNumberCell.textContent = contact.data_contact_number;
        contactEmailAddressCell.textContent = contact.data_contact_email;
        contactAddressCell.textContent = contact.data_contact_address;
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
});
