import React, {FC, FormEvent, useEffect, useState} from 'react';
import './CatalogItems.scss';
import SortMenu from "../../entities/SortMenu/SortMenu";
// import CountPrice from "../../common/CountPrice/CountPrice";
import FilterMenu from "../../entities/FilterMenu/FilterMenu";
import {defaultReminder, IReminder} from "../../../interfaces/reminderInterfaces";
import Reminder from "../../entities/Reminder/Reminder";
import ModalReminderForm from "../../entities/ModalReminderForm/ModalReminderForm";
import ReminderServices from "../../../services/ReminderServices";
import {AppDispatch, RootState} from "../../../store/store.config";
import {getReminders} from "../../../store/reminderSlice";
import {setSearchOption} from "../../../store/reminderSlice";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../common/Loader/Loader";

const CatalogItems: FC = () => {
    const [active, setActive] = useState<boolean>(false);
    const [editedReminder, setEditedReminder] = useState<IReminder>(defaultReminder);
    const {
        reminders,
        searchOptions,
        status
    } = useSelector((state: RootState) => state.remindersReducer);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getReminders(searchOptions));
    }, [dispatch, searchOptions]);


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
        dispatch(getReminders(searchOptions));
        setActive(false);
        setEditedReminder(defaultReminder);
    }

    return (
        <section className={"main-container"}>
            <div className={'menu'}>
                <SortMenu
                    setSearchOptions={(e) => dispatch(setSearchOption({...searchOptions, sort: e.target.value}))}
                />
                <hr/>
                <FilterMenu
                    setPriceOptions={(e) => dispatch(setSearchOption({...searchOptions, price: e.target.value}))}
                    setDateOptions={(e) => dispatch(setSearchOption({...searchOptions, date: e.target.value}))}
                    setSubjectOptions={(e) => dispatch(setSearchOption({...searchOptions, subject: e.target.value}))}
                />
                {/*<hr/>*/}
                {/*<CountPrice/>*/}
            </div>
            <div className={"reminders-container"}>
                {status === "pending" && <Loader />}
                {reminders?.map((reminder: IReminder) => (
                    <Reminder
                        key={reminder.id}
                        reminder={reminder}
                        onUpdateModal={() => {setActive(true); setEditedReminder(reminder)}}
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