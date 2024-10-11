window.addEventListener("load", showReminders);

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
    showReminders();
});
sort_value.addEventListener("change", showReminders);
reset_search.addEventListener("click", resetReminders);
count_reminders.addEventListener("click", countReminders);
modal_background.addEventListener("click", closeModal);
close_create_modal_button.addEventListener("click", closeModal);
close_update_modal_button.addEventListener("click", closeModal);
create_button.addEventListener("click", createReminder);
create_submit_button.addEventListener("click", handleCreateReminder);
update_submit_button.addEventListener("click", handleUpdateReminder, this);


function getReminders(sort, filter) {
    let url;
    filter = filter.toLowerCase().trim();
    if (sort && filter) {
        url = `http://localhost:4000/api/v1/reminders/get?sort=${sort}&filter=${filter}`;
    } else if (sort) {
        url = `http://localhost:4000/api/v1/reminders/get?sort=${sort}`;
    } else if (filter) {
        url = `http://localhost:4000/api/v1/reminders/get?filter=${filter}`;
    } else {
        url = `http://localhost:4000/api/v1/reminders/get`;
    }


    return fetch(url, {
        method: 'GET'
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch reminders');
            }
        })
        .then(data => {
            console.log(data.data);
            return data.data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getReminderById(id) {
    return fetch(`http://localhost:4000/api/v1/reminders/get/${id}`, {
        method: 'GET'
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch reminder');
            }
        })
        .then(data => {
            return data.data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function deleteReminder(id) {
    return fetch(`http://localhost:4000/api/v1/reminders/delete/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to delete reminder');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createReminderEndpoint(data) {
    return fetch('http://localhost:4000/api/v1/reminders/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 409) {
                throw new Error('Reminder already exists');
            } else {
                throw new Error('Failed to create reminder');
            }
        })
        .catch(error => {
            return { error: error.message };
        });
}

function updateReminderEndpoint(data) {
    return fetch(`http://localhost:4000/api/v1/reminders/update/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status === 204) {
                return { success: true };
            } else {
                throw new Error('Failed to update reminder');
            }
        })
        .catch(error => {
            return { error: error.message };
        });
}

function countPrice(ids) {
    return fetch('http://localhost:4000/api/v1/reminders/count-price', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ids: ids})
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to count price');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function showReminders() {
    let sort = document.querySelector("#sort").value;
    let filter = document.querySelector("#search-input").value;
    console.log(sort, filter);
    clearReminders();
    getReminders(sort, filter).then(data => {
        data.forEach(reminder => {
            const temp_container = document.getElementById("reminders-container");
            const template = document.getElementById("reminder-template");
            const clone = template.content.cloneNode(true);
            const id = clone.querySelector("#id");
            id.innerText = reminder.id;
            const title = clone.querySelector("#title");
            title.innerText = reminder.title;
            const description = clone.querySelector("#description");
            description.innerText = reminder.description;
            const price = clone.querySelector("#price");
            price.innerText = reminder.price;
            const due_date = clone.querySelector("#due-date");
            due_date.innerText = new Date(reminder.dueDate).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).replace(',', '');
            const last_updated = clone.querySelector("#last-updated");
            last_updated.innerText = new Date(reminder.lastUpdated).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).replace(',', '');

            clone.querySelector("#update").addEventListener("click", updateElement, this);
            clone.querySelector("#delete").addEventListener("click", deleteElement, this);
            temp_container.appendChild(clone);
        });
    });
}




function deleteElement(elem) {
    elem = elem.srcElement
    let element = elem.parentNode.parentNode;
    let id = element.querySelector("#id").innerText / 1;
    deleteReminder(id).then(data => {
        clearReminders();
        showReminders();
    });
}

function countReminders(){
    const items = document.querySelectorAll("#id");
    const ids = [];
    for (let item of items){
        ids.push(item.innerText / 1);
    }
    countPrice(ids).then(data => {
        document.querySelector("#amount").innerText = data.totalPrice;
    });
}

function clearReminders() {
    const reminders_container = document.getElementById("reminders-container");
    reminders_container.innerHTML = "";
}

function resetReminders() {
    clearReminders();
    setTimeout(() => {
        showReminders();
    }, 0);
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
        return alert("Please fill in all the fields.");
    }

    if (new Date(dueDate) < new Date()) {
        return alert("The due date cannot be in the past.");
    }

    dueDate = new Date(dueDate).toISOString();
    let lastUpdated = new Date().toISOString();

    createReminderEndpoint({ title, description, price, dueDate, lastUpdated }).then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            clearReminders();
            showReminders();
            closeModal();
        }
    });
}


function updateElement(elem) {
    let body = document.querySelector("body");
    body.style.overflow = "hidden";
    elem = elem.srcElement;
    let element = elem.parentNode.parentNode;
    let id = element.querySelector("#id").innerText / 1;
    console.log(id);
    getReminderById(id).then(data => {
        document.getElementById("update-modal").style.display = "block";
        document.getElementById("modal-background").style.display = "block";
        document.getElementById("update-modal-id").innerText = data.id;
        document.getElementById("update-modal-title").value = data.title;
        document.getElementById("update-modal-description").value = data.description;
        document.getElementById("update-modal-price").value = data.price;

        const date = new Date(data.dueDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        document.getElementById("update-modal-due-date").value = `${year}-${month}-${day}T${hours}:${minutes}`;
    });
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
        return alert("Please fill in all the fields.");
    }

    if (new Date(dueDate) < new Date()) {
        return alert("The due date cannot be in the past.");
    }

    dueDate = new Date(dueDate).toISOString();
    let lastUpdated = new Date().toISOString();
    updateReminderEndpoint({id, title, description, price, dueDate, lastUpdated}).then(data => {
        clearReminders();
        showReminders();
        closeModal();
    });
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
