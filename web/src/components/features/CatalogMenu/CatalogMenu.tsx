import React, {FC, FormEvent, useState} from 'react';
import CreateButton from "../../common/CreateButton/CreateButton";
import SearchForm from "../../entities/SearchForm/SearchForm";
import './CatalogMenu.scss';
import ModalReminderForm from "../../entities/ModalReminderForm/ModalReminderForm";
import {defaultReminder, IReminder} from "../../../interfaces/reminderInterfaces";
import {ISearchOptions} from "../../../interfaces/commonInterfaces";
import ReminderServices from "../../../services/ReminderServices";

interface CatalogMenuProps {
    reminders: IReminder[];
    setReminders: React.Dispatch<React.SetStateAction<IReminder[]>>;
    searchOptions: ISearchOptions;
    setSearchOptions: React.Dispatch<React.SetStateAction<{ search: string, sort: string, price: string, priority: string, subject: string }>>;
}


const CatalogMenu: FC<CatalogMenuProps> = ({reminders, setReminders, searchOptions, setSearchOptions}) => {
    const [active, setActive] = useState<boolean>(false);
    const [newReminder, setNewReminder] = useState<IReminder>(defaultReminder);



    const handleNewReminder = async (e: FormEvent) => {
        e.preventDefault();
        if (!newReminder.title || !newReminder.description || !newReminder.price || !newReminder.dueDate || !newReminder.priority || !newReminder.subject) {
            return alert("Please fill in all the fields.");
        }

        if (new Date(newReminder.dueDate) < new Date()) {
            return alert("The due date cannot be in the past.");
        }

        const isNameUnique = !reminders.some(reminder => reminder.title === newReminder.title);
        if (!isNameUnique) {
            alert('Reminder title must be unique');
            return;
        }
        await ReminderServices.createReminder(newReminder);

        setActive(false);
        setNewReminder(defaultReminder);
        await ReminderServices.getAllReminders(searchOptions).then(response => setReminders(response.data.data));
    }
    return (
            <section className={"reminders-menu"}>
                <div className="create-container">
                    <h2 className="h2">Reminders</h2>
                    <CreateButton name={"Create reminder"} CreateModal={() => setActive(true)}/>
                </div>
                <SearchForm setSearchOptions={setSearchOptions}/>
                <ModalReminderForm
                    reminder={newReminder}
                    setReminder={setNewReminder}
                    handleSubmit={handleNewReminder}
                    headText="Add new reminder"
                    active={active}
                    setActive={setActive}
                />
            </section>

    );
};

export default CatalogMenu;