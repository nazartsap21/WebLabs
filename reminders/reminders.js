class reminder {
    constructor(id, title, description, price, due_date, last_updated) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price
        this.dueDate = due_date;
        this.lastUpdate = last_updated;
    }

}

const reminder1 = {
    id: '3',
    title: 'Do homework',
    description: 'Finish the math homework',
    price: 100,
    dueDate: new Date("Sep 30 2024 11:59:00 PM"),
    lastUpdate: new Date("Sep 28 2024 03:45:00 PM")
};

const reminder2 = {
    id: '2',
    title: 'Call mom',
    description: 'Call mom',
    price: 200,
    dueDate: new Date("Oct 05 2024 09:00:00 AM"),
    lastUpdate: new Date("Sep 28 2024 08:15:00 AM")
};

const reminder3 = {
    id: '1',
    title: 'Buy groceries',
    description: 'Buy milk, bread, and eggs',
    price: 70,
    dueDate: new Date("Sep 28 2024 05:00:00 PM"),
    lastUpdate: new Date("Sep 28 2024 02:00:00 PM")
};

const reminder4 = {
    id: '4',
    title: 'Go to the gym',
    description: 'Go to the gym and workout',
    price: 400,
    dueDate: new Date("Sep 28 2024 12:00:00 PM"),
    lastUpdate: new Date("Sep 26 2024 04:30:00 PM")
};

const reminders = [reminder1, reminder2, reminder3, reminder4];

window.addEventListener("load", showReminders(reminders));

let count_reminders = document.getElementById("count-reminders");
let search_input = document.getElementById("search-button");
let reset_search = document.getElementById("reset-button");
let sort_value = document.getElementById("sort");
let search_form = document.getElementById("search-form");
search_form.addEventListener("submit", function (event) {
    event.preventDefault();
    searchReminders();
});
sort_value.addEventListener("change", sortReminders, this);
reset_search.addEventListener("click", resetReminders);
search_input.addEventListener("click", searchReminders);
count_reminders.addEventListener("click", countReminders);


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
        due_date.innerText = reminders[i].dueDate;
        const last_updated = clone.querySelector("#last-updated");
        last_updated.innerText = reminders[i].lastUpdate;
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
        const object = new reminder(id, title, description, price, last_updated, due_date);
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

function updateElement(elem) {
    console.log("update");
}

function resetReminders() {
    clearReminders();
    showReminders(reminders);
}

function searchReminders() {
    const search_text = document.getElementById("search-input").value;
    const reminders_search = reminders.filter(reminder => reminder.title.toLowerCase().includes(search_text.toLowerCase().trim()));
    clearReminders();
    showReminders(reminders_search);
}
