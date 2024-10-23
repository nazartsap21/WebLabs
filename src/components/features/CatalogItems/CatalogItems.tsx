import React, {Dispatch, FC, FormEvent, useState} from 'react';
import './CatalogItems.scss';
import SortMenu from "../../entities/SortMenu/SortMenu";
import CountPrice from "../../common/CountPrice/CountPrice";
import FilterMenu from "../../entities/FilterMenu/FilterMenu";
import {defaultReminder, IReminder} from "../../../interfaces/reminderInterfaces";
import Reminder from "../../entities/Reminder/Reminder";
import ModalReminderForm from "../../entities/ModalReminderForm/ModalReminderForm";


interface CatalogItemsProps {
    reminders: IReminder[];
    setReminders: Dispatch<React.SetStateAction<IReminder[]>>;
}

const CatalogItems: FC<CatalogItemsProps> = (props) => {
    const [active, setActive] = useState<boolean>(false);
    const [editedReminder, setEditedReminder] = useState<IReminder>(defaultReminder);


    const handleEditedReminder = (e: FormEvent) => {
        e.preventDefault();
        if (!editedReminder.title || !editedReminder.description || !editedReminder.price || !editedReminder.dueDate) {
            alert('All fields are required');
            return;
        }

        const isNameUnique = !props.reminders.some(reminder => reminder.title === editedReminder.title);
        if (!isNameUnique) {
            alert('Reminder title must be unique');
            return;
        }

        const updatedReminders = props.reminders.map(reminder =>
            reminder.id === editedReminder.id ? editedReminder : reminder
        );
        props.setReminders(updatedReminders);
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
                {props.reminders.map((value, key) => (
                    <Reminder
                        key={key}
                        reminder={value}
                        onDelete={() => {props.setReminders(props.reminders.filter(reminder => reminder.id !== value.id))}}
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