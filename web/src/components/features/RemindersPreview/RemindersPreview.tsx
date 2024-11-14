import React, {FC, useEffect, useState} from 'react';
import './RemindersPreview.scss';
import bird from './Bird.svg';
import MoreButton from "../../common/MoreButton/MoreButton";
import ReminderPreview from "../../entities/ReminerPreview/ReminderPreview";
import {Link} from "react-router-dom";
import {AppDispatch, RootState} from "../../../store/store.config";
import {useDispatch, useSelector} from "react-redux";
import {getReminders} from "../../../store/reminderSlice";
import {defaultSearchOptions} from "../../../interfaces/commonInterfaces";

const RemindersPreview: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { reminders } = useSelector((state: RootState) => state.remindersReducer);
    const [counter, setCounter] = useState<number>(3);

    const handleShowMore = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCounter(prevCounter => prevCounter + 3);
    }

    useEffect(() => {
        dispatch(getReminders(defaultSearchOptions));
    }, []);

    return (
        <section className={"reminders-preview"}>
            <Link className={'view-all'} to={"catalog"}>View all <img src={bird} alt={"bird"}/></Link>
            <div className={"reminders-preview-container"}>
                {reminders?.slice(0, counter).map(reminder => (
                    <ReminderPreview key={reminder.id} {...reminder}/>
                ))}
            </div>
            {reminders && counter < reminders.length && (
                <MoreButton name={'View more'} handleClick={handleShowMore}/>
            )}
        </section>
    );
};

export default RemindersPreview;