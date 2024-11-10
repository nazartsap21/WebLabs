import React, {FC, FormEvent, useCallback, useEffect, useState} from 'react';
import './CatalogItems.scss';
import SortMenu from "../../entities/SortMenu/SortMenu";
// import CountPrice from "../../common/CountPrice/CountPrice";
import FilterMenu from "../../entities/FilterMenu/FilterMenu";
import {defaultReminder, IReminder} from "../../../interfaces/reminderInterfaces";
import Reminder from "../../entities/Reminder/Reminder";
import ModalReminderForm from "../../entities/ModalReminderForm/ModalReminderForm";
import {ISearchOptions} from "../../../interfaces/commonInterfaces";
import ReminderServices from "../../../services/ReminderServices";


interface CatalogItemsProps {
    reminders: IReminder[];
    setReminders: React.Dispatch<React.SetStateAction<IReminder[]>>;
    searchOptions: ISearchOptions;
    setSearchOptions: React.Dispatch<React.SetStateAction<ISearchOptions>>;
}

const CatalogItems: FC<CatalogItemsProps> = ({reminders, setReminders, searchOptions, setSearchOptions}) => {
    const [active, setActive] = useState<boolean>(false);
    const [editedReminder, setEditedReminder] = useState<IReminder>(defaultReminder);


    const getReminders = useCallback(async () => {
        const response = await ReminderServices.getAllReminders(searchOptions);
        setReminders(response.data.data);
        console.log(response.data);
    }, [setReminders, searchOptions]);

    useEffect(() => {
        getReminders().then();
    }, [getReminders]);

    const handleEditedReminder = async (e: FormEvent) => {
        e.preventDefault();
        if (!editedReminder.title || !editedReminder.description || !editedReminder.price || !editedReminder.dueDate || !editedReminder.subject) {
            alert('All fields are required');
            return;
        }

        if (new Date(editedReminder.dueDate) < new Date()) {
            return alert("The due date cannot be in the past.");
        }

        await ReminderServices.updateReminder(editedReminder);
        getReminders().then();
        setActive(false);
        setEditedReminder(defaultReminder);
    }

    return (
        <section className={"main-container"}>
            <div className={'menu'}>
                <SortMenu setSearchOptions={setSearchOptions}/>
                <hr/>
                <FilterMenu setSearchOptions={setSearchOptions}/>
                {/*<hr/>*/}
                {/*<CountPrice/>*/}
            </div>
            <div className={"reminders-container"}>
                {reminders.map((value, key) => (
                    <Reminder
                        key={key}
                        reminder={value}
                        setReminders={setReminders}
                        searchOptions={searchOptions}
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