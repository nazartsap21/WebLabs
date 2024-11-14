import React, {FC, FormEvent, useState} from 'react';
import CreateButton from "../../common/CreateButton/CreateButton";
import SearchForm from "../../entities/SearchForm/SearchForm";
import './CatalogMenu.scss';
import ModalReminderForm from "../../entities/ModalReminderForm/ModalReminderForm";
import {defaultReminder, IReminder} from "../../../interfaces/reminderInterfaces";
import ReminderServices from "../../../services/ReminderServices";
import {AppDispatch, RootState} from "../../../store/store.config";
import {getReminders} from "../../../store/reminderSlice";
import {setSearchOption} from "../../../store/reminderSlice";
import {useDispatch, useSelector} from "react-redux";


const CatalogMenu: FC = () => {
    const {
        reminders,
        searchOptions
    } = useSelector((state: RootState) => state.remindersReducer);
    const [active, setActive] = useState<boolean>(false);
    const [newReminder, setNewReminder] = useState<IReminder>(defaultReminder);
    const dispatch = useDispatch<AppDispatch>();


    const handleNewReminder = async (e: FormEvent) => {
        e.preventDefault();
        if (!newReminder.title || !newReminder.description || !newReminder.price || !newReminder.dueDate || !newReminder.subject) {
            return alert("Please fill in all the fields.");
        }

        if (new Date(newReminder.dueDate) < new Date()) {
            return alert("The due date cannot be in the past.");
        }

        const isNameUnique = !reminders?.some(reminder => reminder.title === newReminder.title);
        if (!isNameUnique) {
            alert('Reminder title must be unique');
            return;
        }
        await ReminderServices.createReminder(newReminder);

        setActive(false);
        setNewReminder(defaultReminder);
        dispatch(getReminders(searchOptions));
    }
    return (
            <section className={"reminders-menu"}>
                <div className="create-container">
                    <h2 className="h2">Reminders</h2>
                    <CreateButton name={"Create reminder"} CreateModal={() => setActive(true)}/>
                </div>
                <SearchForm setSearchOptions={(e) => dispatch(setSearchOption({...searchOptions, search: e?.target.value || ''}))}/>
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