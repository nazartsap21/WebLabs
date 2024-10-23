import React, {FC} from 'react';
import './RemindersPreview.scss';
import bird from './Bird.svg';
import MoreButton from "../../common/MoreButton/MoreButton";
import {IPrevReminder} from "../../../interfaces/previewInterface";
import ReminderPreview from "../../entities/ReminerPreview/ReminderPreview";

const reminders: IPrevReminder[] = [
    {
        id: 1,
        title: 'Call mom',
        description: 'Call mom and wish her a happy birthday',
        dueDate: 'Oct 25 2024, 11:15 PM',
    },
    {
        id: 2,
        title: 'Buy groceries',
        description: 'Buy groceries for the week',
        dueDate: 'Oct 26 2024, 11:15 PM',
    },
    {
        id: 3,
        title: 'Send report',
        description: 'Send the report to the manager',
        dueDate: 'Oct 27 2024, 11:15 PM',
    }
];

const RemindersPreview: FC = () => {
    return (
        <section className={"reminders-preview"}>
            <a href={"/"}>View all <img src={bird} alt={"bird"}/></a>
            <div className={"reminders-preview-container"}>
                {reminders.map(reminder => (
                    <ReminderPreview key={reminder.id} {...reminder}/>
                ))}
            </div>
            <MoreButton name={'View more'} />
        </section>
    );
};

export default RemindersPreview;