import React, {FC, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import './ItemPage.scss';
import {IReminder} from "../../../interfaces/reminderInterfaces";
import ReminderServices from "../../../services/ReminderServices";

const ItemPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [reminder, setReminder] = useState<IReminder>();
    const navigate = useNavigate();

    useEffect(() => {
        ReminderServices.getReminder(Number(id)).then(response => { console.log(response.data); setReminder(response.data.data)});
    }, [id]);


    if (!reminder) {
        return <h1>Reminder not found</h1>
    }

    return (
        <div className={'item-page'}>
            <div className={'main-content'}>
                <div className={'text-content'}>
                    <h1>{reminder.title}</h1>
                    <h3>{reminder.description}</h3>
                </div>
                <div className={'info-content'}>
                    <p>Priority: {reminder.priority}</p>
                    <p>Subject: {reminder.subject}</p>
                    <p>Due date: {reminder.dueDate.slice(0,16).replace('T', ' ')}</p>
                </div>
            </div>
            <div className={'side-content'}>
                <h3>Price: {reminder.price}$</h3>
                <Link
                    to={'..'}
                    className={'back-button'}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }}
                >Go back</Link>
            </div>
        </div>
    );
};

export default ItemPage;