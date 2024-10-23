import React, {FC, FormEvent, useState} from 'react';
import CreateButton from "../../common/CreateButton/CreateButton";
import SearchForm from "../../entities/SearchForm/SearchForm";
import './CatalogMenu.scss';
import ModalReminderForm from "../../entities/ModalReminderForm/ModalReminderForm";
import {defaultReminder, IReminder} from "../../../interfaces/reminderInterfaces";
import {useReminders} from "../../context/RemindersContext";

interface CatalogMenuProps {
    setSearchOptions: (searchOptions: { search: string, sort: string, period: string, priority: string, subject: string }) => void;
}


const CatalogMenu: FC<CatalogMenuProps> = (props) => {
    const {reminders, setReminders} = useReminders();
    const [active, setActive] = useState<boolean>(false);
    const [newReminder, setNewReminder] = useState<IReminder>(defaultReminder);


    const handleNewReminder = (e: FormEvent) => {
        e.preventDefault();
        if (!newReminder.title || !newReminder.description || !newReminder.price || !newReminder.dueDate) {
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
        newReminder.lastUpdated = new Date().toISOString();
        const max_id = reminders.length > 0 ? Math.max(...reminders.map(reminder => reminder.id)) : 0;
        setReminders([...reminders, { ...newReminder, id: max_id + 1 }]);
        setActive(false);
        setNewReminder(defaultReminder);

        console.log(newReminder);
    }
    return (
            <section className={"reminders-menu"}>
                <div className="create-container">
                    <h2 className="h2">Reminders</h2>
                    <CreateButton name={"Create reminder"} CreateModal={() => setActive(true)}/>
                </div>
                <SearchForm/>
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