import React, {FC, useState, useEffect} from 'react';
import './Reminder.scss';
import {IReminder} from "../../../interfaces/reminderInterfaces";
import UpdateButton from "../../common/UpdateButton/UpdateButton";
import DeleteButton from "../../common/DeleteButton/DeleteButton";
import ViewMoreButton from "../../common/ViewMoreButton/ViewMoreButton";

interface ReminderProps {
    reminder: IReminder,
    onDelete: () => void;
    onUpdateModal: () => void;
}

const Reminder: FC<ReminderProps> = (props) => {
    const [dueDate, setDueDate] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');

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
            <p className={"id"}>{props.reminder.id}</p>
            <div className={"text"}>
                <h3 id="title">{props.reminder.title}</h3>
                <p id="description">{props.reminder.description}</p>
                <p id="price">{props.reminder.price}</p>
            </div>
            <div className={"dates"}>
                <p>Due date: <span>{dueDate}</span></p>
                <p>Last updated: <span>{lastUpdated}</span></p>
            </div>
            <div className={"buttons"}>
                <UpdateButton onUpdateModal={() => props.onUpdateModal()}/>
                <DeleteButton onDelete={() => props.onDelete()}/>
            </div>
            <ViewMoreButton />
        </div>
    );
};

export default Reminder;