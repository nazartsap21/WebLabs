class reminder {
    constructor(id, title, description, price, due_date, last_updated) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.dueDate = due_date;
        this.lastUpdate = last_updated;
    }
}

// Creating reminders via constructor
const reminder1 = new reminder(
    '3',
    'Do homework',
    'Finish the math homework',
    100,
    new Date("Oct 30 2024 11:59:00 PM").toISOString().slice(0, 16),
    new Date("Sep 28 2024 03:45:00 PM").toISOString().slice(0, 16)
);

const reminder2 = new reminder(
    '2',
    'Call mom',
    'Call mom',
    200,
    new Date("Oct 05 2024 09:00:00 AM").toISOString().slice(0, 16),
    new Date("Sep 28 2024 08:15:00 AM").toISOString().slice(0, 16)
);

const reminder3 = new reminder(
    '1',
    'Buy groceries',
    'Buy milk, bread, and eggs',
    70,
    new Date("Oct 28 2024 05:00:00 PM").toISOString().slice(0, 16),
    new Date("Sep 28 2024 02:00:00 PM").toISOString().slice(0, 16)
);

const reminder4 = new reminder(
    '4',
    'Go to the gym',
    'Go to the gym and workout',
    400,
    new Date("Oct 28 2024 12:00:00 PM").toISOString().slice(0, 16),
    new Date("Sep 26 2024 04:30:00 PM").toISOString().slice(0, 16)
);

const reminders = [reminder1, reminder2, reminder3, reminder4];


window.addEventListener("load", showReminders(reminders));

let count_reminders = document.getElementById("count-reminders");
let search_input = document.getElementById("search-button");
let reset_search = document.getElementById("reset-button");
let sort_value = document.getElementById("sort");
let search_form = document.getElementById("search-form");
let create_button = document.getElementById("create-reminder");
let modal_background = document.querySelector("#modal-background");
let create_submit_button = document.getElementById("submit-create-modal");
let update_submit_button = document.getElementById("submit-update-modal");
let close_create_modal_button = document.getElementById("close-create-modal");
let close_update_modal_button = document.getElementById("close-update-modal");

search_form.addEventListener("submit", function (event) {
    event.preventDefault();
    searchReminders();
});
sort_value.addEventListener("change", sortReminders, this);
reset_search.addEventListener("click", resetReminders);
search_input.addEventListener("click", searchReminders);
count_reminders.addEventListener("click", countReminders);
modal_background.addEventListener("click", closeModal);
close_create_modal_button.addEventListener("click", closeModal);
close_update_modal_button.addEventListener("click", closeModal);
create_button.addEventListener("click", createReminder);
create_submit_button.addEventListener("click", handleCreateReminder);
update_submit_button.addEventListener("click", handleUpdateReminder, this);


function showReminders(reminders) {
    for (let i in reminders) {
        const temp_container = document.getElementById("reminders-container");
        const template = document.getElementById("reminder-template");
        const clone = template.content.cloneNode(true);
        const id = clone.querySelector("#id");
        id.innerText = reminders[i].id;
        const title = clone.querySelector("#title");
        title.innerText = reminders[i].title;
        const description = clone.querySelector("#description");
        description.innerText = reminders[i].description;
        const price = clone.querySelector("#price");
        price.innerText = reminders[i].price;
        const due_date = clone.querySelector("#due-date");
        due_date.innerText = reminders[i].dueDate.replace("T", " ");
        const last_updated = clone.querySelector("#last-updated");
        last_updated.innerText = reminders[i].lastUpdate.replace("T", " ");
        clone.querySelector("#update").addEventListener("click", updateElement, this);
        clone.querySelector("#delete").addEventListener("click", deleteElement, this);
        temp_container.appendChild(clone);
    }
}

function sortReminders(value) {
    const items = document.querySelectorAll(".reminder");
    const item_list = [];
    for (let item of items){
        let id = item.querySelector("#id").innerText;
        let title = item.querySelector("#title").innerText;
        const description = item.querySelector("#description").innerText;
        const price = item.querySelector("#price").innerText/1;
        const due_date = item.querySelector("#due-date").innerText;
        const last_updated = item.querySelector("#last-updated").innerText;
        const object = new reminder(id, title, description, price, due_date, last_updated);
        item_list.push(object);
    }
    const sort_value = document.getElementById("sort").value;
    if (sort_value === "a-z") {
        item_list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort_value === "z-a") {
        item_list.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort_value === "sooner") {
        item_list.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sort_value === "later") {
        item_list.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    }
    clearReminders();
    showReminders(item_list);
}


function clearReminders() {
    const reminders_container = document.getElementById("reminders-container");
    reminders_container.innerHTML = "";
}

function deleteElement(elem) {
    elem = elem.srcElement
    let element = elem.parentNode.parentNode;
    let id = element.querySelector("#id").innerText;
    const obj_to_delete = reminders.find(reminder => reminder.id === id);
    reminders.splice(reminders.indexOf(obj_to_delete), 1);
    element.remove();
}

function countReminders(){
    const items = document.querySelectorAll("#price");
    let amount = 0;
    for (const item of items) {
        amount += item.innerText/1;
    }
    document.querySelector("#amount").innerText = amount;
}


function resetReminders() {
    clearReminders();
    sort_value.value = "";
    showReminders(reminders);
}

function searchReminders() {
    const search_text = document.getElementById("search-input").value;
    const reminders_search = reminders.filter(reminder => reminder.title.toLowerCase().includes(search_text.toLowerCase().trim()));
    clearReminders();
    showReminders(reminders_search);
}


function createReminder() {
    let body = document.querySelector("body");
    body.style.overflow = "hidden";

    document.getElementById("create-modal").style.display = "block";
    document.getElementById("modal-background").style.display = "block";
    document.getElementById("create-modal-title").value = "";
    document.getElementById("create-modal-description").value = "";
    document.getElementById("create-modal-price").value = "";
    document.getElementById("create-modal-due-date").value = "";
}

function handleCreateReminder() {
    let title = document.getElementById("create-modal-title").value.trim();
    let description = document.getElementById("create-modal-description").value.trim();
    let price = document.getElementById("create-modal-price").value.trim();
    let dueDate = document.getElementById("create-modal-due-date").value.trim();

    if (!title || !description || !price || !dueDate) {
        alert("Please fill in all the fields.");
        return;
    }

    if (new Date(dueDate) < new Date()) {
        alert("The due date cannot be in the past.");
        return;
    }

    if (reminders.find((reminder) => reminder.title === title) || reminders.find((reminder) => reminder.description === description)) {
        alert("This reminder already exist");
        return;
    }

    let lastUpdated = new Date().toISOString().slice(0, 16).replace("T", " ");
    let id = Math.floor(Math.random() * 10000);

    const newReminder = new reminder(id + "", title, description, price, dueDate, lastUpdated);
    reminders.push(newReminder);

    clearReminders();
    showReminders(reminders);
    closeModal();
}


function updateElement(elem) {
    let body = document.querySelector("body");
    body.style.overflow = "hidden";
    elem = elem.srcElement;
    let element = elem.parentNode.parentNode;
    let id = element.querySelector("#id").innerText;
    const objToUpdate = reminders.find(reminder => reminder.id === id);
    console.log(objToUpdate);
    document.getElementById("update-modal").style.display = "block";
    document.getElementById("modal-background").style.display = "block";
    document.getElementById("update-modal-id").innerText = objToUpdate.id;
    document.getElementById("update-modal-title").value = objToUpdate.title;
    document.getElementById("update-modal-description").value = objToUpdate.description;
    document.getElementById("update-modal-price").value = objToUpdate.price;
    document.getElementById("update-modal-due-date").value = objToUpdate.dueDate.replace(" ", "T");
}

function handleUpdateReminder(elem) {
    elem = elem.srcElement;

    let element = elem.parentNode;
    let id = element.querySelector("#update-modal-id").innerText;

    let title = document.getElementById("update-modal-title").value.trim();
    let description = document.getElementById("update-modal-description").value.trim();
    let price = document.getElementById("update-modal-price").value.trim();
    let dueDate = document.getElementById("update-modal-due-date").value.trim();

    if (!title || !description || !price || !dueDate) {
        alert("Please fill in all the fields.");
        return;
    }

    if (new Date(dueDate) < new Date()) {
        alert("The due date cannot be in the past.");
        return;
    }

    const objToUpdate = reminders.find(reminder => reminder.id === id);
    objToUpdate.title = title;
    objToUpdate.description = description;
    objToUpdate.price = price;
    objToUpdate.dueDate = dueDate;
    objToUpdate.lastUpdate = new Date().toISOString().slice(0, 16).replace("T", " ");

    clearReminders();
    showReminders(reminders);
    closeModal();
}



function closeModal() {
    let body = document.querySelector("body");
    let create_modal = document.getElementById("create-modal");
    let update_modal = document.getElementById("update-modal");
    let modalBackground = document.getElementById("modal-background");
    create_modal.style.display = "none";
    update_modal.style.display = "none";
    modalBackground.style.display = "none";
    body.style.overflow = "visible";
}
