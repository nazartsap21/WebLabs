import React, {FC} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useReminders} from "../../context/RemindersContext";
import './ItemPage.scss';

const ItemPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { reminders } = useReminders();
    const reminder = reminders.find(reminder => reminder.id === Number(id));
    const navigate = useNavigate();


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