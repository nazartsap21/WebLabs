import React, {FC, FormEvent, useEffect, useState} from 'react';
import './CatalogItems.scss';
import SortMenu from "../../entities/SortMenu/SortMenu";
import CountPrice from "../../common/CountPrice/CountPrice";
import FilterMenu from "../../entities/FilterMenu/FilterMenu";
import {defaultReminder, IReminder} from "../../../interfaces/reminderInterfaces";
import Reminder from "../../entities/Reminder/Reminder";
import ModalReminderForm from "../../entities/ModalReminderForm/ModalReminderForm";
import {useReminders} from "../../context/RemindersContext";


interface CatalogItemsProps {
    searchOptions: { search: string, sort: string, price: string, priority: string, subject: string };
    setSearchOptions: React.Dispatch<React.SetStateAction<{ search: string, sort: string, price: string, priority: string, subject: string }>>;
}

const filterReminderBySearchOptions = (reminders: IReminder[], searchOptions: { search: string, sort: string, price: string, priority: string, subject: string }, filterPrice: [number, number]) => {
    const { search, sort, price, priority, subject } = searchOptions;

    const filteredReminders = reminders.filter(reminder =>
        (reminder.title.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
            reminder.description.toLowerCase().trim().includes(search.toLowerCase().trim())) &&
        (price ? reminder.price <= filterPrice[1] && reminder.price >= filterPrice[0] : true) &&
        (priority ? reminder.priority === priority : true) &&
        (subject ? reminder.subject === subject : true)
    );

    return filteredReminders.sort((a, b) => {
        if (sort === 'sooner'){
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        } else if (sort === 'later'){
            return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        } else if (sort === 'a-z'){
            return a.title.localeCompare(b.title);
        } else if (sort === 'z-a'){
            return b.title.localeCompare(a.title);
        }
        return 0;
    });
}

const CatalogItems: FC<CatalogItemsProps> = (props) => {
    const {reminders, setReminders} = useReminders();
    const [active, setActive] = useState<boolean>(false);
    const [editedReminder, setEditedReminder] = useState<IReminder>(defaultReminder);
    const [filterPrice, setFilterPrice] = useState<[number, number]>([0, 0]);
    const [filteredReminders, setFilteredReminders] = useState(filterReminderBySearchOptions(reminders, props.searchOptions, filterPrice));

    useEffect(() => {
        if (props.searchOptions.price === '50') {
            setFilterPrice([0, 50]);
        } else if (props.searchOptions.price === '50-200') {
            setFilterPrice([50, 200]);
        } else if (props.searchOptions.price === '200-500') {
            setFilterPrice([200, 500]);
        } else if (props.searchOptions.price === '500+') {
            setFilterPrice([500, Infinity]);
        }
        setFilteredReminders(filterReminderBySearchOptions(reminders, props.searchOptions, filterPrice));
    }, [reminders, props.searchOptions, filterPrice]);

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
                <SortMenu setSearchOptions={props.setSearchOptions}/>
                <hr/>
                <FilterMenu setSearchOptions={props.setSearchOptions}/>
                {/*<hr/>*/}
                {/*<CountPrice/>*/}
            </div>
            <div className={"reminders-container"}>
                {filteredReminders.map((value, key) => (
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