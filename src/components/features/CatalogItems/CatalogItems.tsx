import React, {FC, FormEvent, useState} from 'react';
import './CatalogItems.scss';
import SortMenu from "../../entities/SortMenu/SortMenu";
import CountPrice from "../../common/CountPrice/CountPrice";
import FilterMenu from "../../entities/FilterMenu/FilterMenu";
import {defaultReminder, IReminder} from "../../../interfaces/reminderInterfaces";
import Reminder from "../../entities/Reminder/Reminder";
import ModalReminderForm from "../../entities/ModalReminderForm/ModalReminderForm";
import {useReminders} from "../../context/RemindersContext";


interface CatalogItemsProps {
    searchOptions: { search: string, sort: string, period: string, priority: string, subject: string };
    setSearchOptions: (searchOptions: { search: string, sort: string, period: string, priority: string, subject: string }) => void;
}

const CatalogItems: FC<CatalogItemsProps> = (props) => {
    const {reminders, setReminders} = useReminders();
    const [active, setActive] = useState<boolean>(false);
    const [editedReminder, setEditedReminder] = useState<IReminder>(defaultReminder);


    const handleEditedReminder = (e: FormEvent) => {
        e.preventDefault();
        if (!editedReminder.title || !editedReminder.description || !editedReminder.price || !editedReminder.dueDate) {
            alert('All fields are required');
            return;
        }

        if (new Date(editedReminder.dueDate) < new Date()) {
            return alert("The due date cannot be in the past.");
        }

        const updatedReminders = reminders.map(reminder =>
            reminder.id === editedReminder.id ? editedReminder : reminder
        );
        setReminders(updatedReminders);
        setActive(false);
        setEditedReminder(defaultReminder);
    }

    return (
        <section className={"main-container"}>
            <div className={'menu'}>
                <SortMenu/>
                <hr/>
                <FilterMenu/>
                <hr/>
                <CountPrice/>
            </div>
            <div className={"reminders-container"}>
                {reminders.map((value, key) => (
                    <Reminder
                        key={key}
                        reminder={value}
                        onDelete={() => {setReminders(reminders.filter(reminder => reminder.id !== value.id))}}
                        onUpdateModal={() => {setActive(true); setEditedReminder(value)}}
                    />
                ))}
            </div>
            <ModalReminderForm
                reminder={editedReminder}
                setReminder={setEditedReminder}
                handleSubmit={handleEditedReminder}
                headText="Edit reminder"
                active={active}
                setActive={setActive}
            />
        </section>
    );
};

export default CatalogItems;