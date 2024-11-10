import React, {FC} from 'react';
import './ReminderPreview.scss';
import {IPrevReminder} from "../../../interfaces/previewInterface";
import reminderPhoto from '../../../assets/reminder.svg';
import {Link} from "react-router-dom";


const ReminderPreview: FC<IPrevReminder> = (props) => {
    return (
        <Link to={`catalog/${props.id}`} className={'reminder-preview'}>
            <img src={reminderPhoto} alt={props.title}/>
            <h2>{props.title}</h2>
            <h3>{props.description}</h3>
            <h4>Due: {props.dueDate.slice(0,16).replace('T', ' ')}</h4>
        </Link>
    );
};

export default ReminderPreview;