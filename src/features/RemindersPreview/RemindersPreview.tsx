import React, {FC} from 'react';
import './RemindersPreview.scss';
import bird from './Bird.svg';

const RemindersPreview: FC = () => {


    return (
        <section className={"reminders-preview"}>
            <a href={"/"}>View all <img src={bird} alt={"bird"}/></a>
            <div className={"reminders-container"}>
                <div className={"reminder"}>
                    <h2>Call mom</h2>
                    <h3>Call mom and wish her a happy birthday</h3>
                    <h4>Due: today</h4>
                </div>
                <div className={"reminder"}>
                    <h2>Buy groceries</h2>
                    <h3>Buy groceries for the week</h3>
                    <h4>Due: tomorrow</h4>
                </div>
                <div className={"reminder"}>
                    <h2>Send report</h2>
                    <h3>Send the report to the manager</h3>
                    <h4>Due: 2 days</h4>
                </div>
            </div>
            <button>View more</button>
        </section>
    );
};

export default RemindersPreview;