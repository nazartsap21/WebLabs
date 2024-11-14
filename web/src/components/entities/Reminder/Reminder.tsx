import React, {FC, useState, useEffect} from 'react';
import './Reminder.scss';
import {IReminder} from "../../../interfaces/reminderInterfaces";
import UpdateButton from "../../common/UpdateButton/UpdateButton";
import DeleteButton from "../../common/DeleteButton/DeleteButton";
import ViewMoreButton from "../../common/ViewMoreButton/ViewMoreButton";
import {ISearchOptions} from "../../../interfaces/commonInterfaces";
import reminderPhoto from '../../../assets/reminder.svg';

import ReminderServices from "../../../services/ReminderServices";
import {AppDispatch, RootState} from "../../../store/store.config";
import {getReminders} from "../../../store/reminderSlice";
import {useDispatch, useSelector} from "react-redux";


interface ReminderProps {
    reminder: IReminder,
    onUpdateModal: () => void;
}

const Reminder: FC<ReminderProps> = (props) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        searchOptions
    } = useSelector((state: RootState) => state.remindersReducer);
    const [dueDate, setDueDate] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');

    const handleDelete = () => {
        ReminderServices.deleteReminder(props.reminder.id).then(() => {
            dispatch(getReminders(searchOptions));
        });
    }

    useEffect(() => {
        setDueDate(new Date(props.reminder.dueDate).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace(',', ''));

        setLastUpdated(new Date(props.reminder.lastUpdated).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace(',', ''));
    }, [props.reminder.dueDate, props.reminder.lastUpdated]);

    return (
        <div className={"reminder"}>
            <img src={ reminderPhoto } alt={props.reminder.title}/>
            <p className={"id"}>{props.reminder.id}</p>
            <div className={"text"}>
                <h3 id="title">{props.reminder.title}</h3>
                <p id="description">{props.reminder.description}</p>
                <p id="price">{props.reminder.price}$</p>
            </div>
            <div className={"dates"}>
                <p>Due date: <span>{dueDate}</span></p>
                <p>Last updated: <span>{lastUpdated}</span></p>
            </div>
            <div className={"buttons"}>
                <UpdateButton onUpdateModal={() => props.onUpdateModal()}/>
                <DeleteButton onDelete={() => handleDelete()}/>
            </div>
            <ViewMoreButton to={`${props.reminder.id}`}/>
        </div>
    );
};

export default Reminder;