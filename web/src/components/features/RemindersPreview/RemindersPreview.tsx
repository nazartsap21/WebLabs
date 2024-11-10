import React, {FC, useEffect, useState} from 'react';
import './RemindersPreview.scss';
import bird from './Bird.svg';
import MoreButton from "../../common/MoreButton/MoreButton";
import ReminderPreview from "../../entities/ReminerPreview/ReminderPreview";
import {Link} from "react-router-dom";
import {IReminder} from "../../../interfaces/reminderInterfaces";
import ReminderServices from "../../../services/ReminderServices";

const RemindersPreview: FC = () => {
    const [reminders, setReminders] = useState<IReminder[]>([])
    const [counter, setCounter] = useState<number>(3);
    const emptySearch = { search: '', sort: '', price: '', priority: '', subject: '' };

    const getReminders = async () => {
        const response = await ReminderServices.getAllReminders(emptySearch);
        setReminders(response.data.data);
    };

    const handleShowMore = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCounter(prevCounter => prevCounter + 3);
    }


    useEffect(() => {
        getReminders().then();
    }, []);

    return (
        <section className={"reminders-preview"}>
            <Link className={'view-all'} to={"catalog"}>View all <img src={bird} alt={"bird"}/></Link>
            <div className={"reminders-preview-container"}>
                {reminders.slice(0, counter).map(reminder => (
                    <ReminderPreview key={reminder.id} {...reminder}/>
                ))}
            </div>
            {counter < reminders.length && (
                <MoreButton name={'View more'} handleClick={handleShowMore}/>
            )}
        </section>
    );
};

export default RemindersPreview;