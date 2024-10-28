import React, {FC, useState} from 'react';
import './RemindersPreview.scss';
import bird from './Bird.svg';
import MoreButton from "../../common/MoreButton/MoreButton";
import {useReminders} from "../../context/RemindersContext";
import ReminderPreview from "../../entities/ReminerPreview/ReminderPreview";
import {Link} from "react-router-dom";

const RemindersPreview: FC = () => {
    const {reminders} = useReminders();
    const [counter, setCounter] = useState<number>(3);

    const handleShowMore = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCounter(prevCounter => prevCounter + 3);
    }

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