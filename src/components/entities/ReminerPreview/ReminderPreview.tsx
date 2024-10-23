import React, {FC} from 'react';
import './ReminderPreview.scss';
import {IPrevReminder} from "../../../interfaces/previewInterface";


const ReminderPreview: FC<IPrevReminder> = (props) => {
    return (
        <div className={'reminder-preview'}>
            <h2>{props.title}</h2>
            <h3>{props.description}</h3>
            <h4>Due: {props.dueDate}</h4>
        </div>
    );
};

export default ReminderPreview;