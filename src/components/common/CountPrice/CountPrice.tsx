import React, {FC} from 'react';
import './CountPrice.scss';
import CountButton from "../CountButton/CountButton";

const CountPrice: FC = () => {
    return (
        <div className={"counter-container"}>
            <h3 className="h4">Count showed reminders:</h3>
            <CountButton />
            <h3>Reminder amount: <span id="amount"></span></h3>
        </div>
    );
};

export default CountPrice;