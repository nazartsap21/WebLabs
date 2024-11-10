import React, {FC} from 'react';
import './CountButton.scss';


const CountButton: FC = () => {
    return (
        <button className={"count-button"} id="count-reminders">Count</button>
    );
};

export default CountButton;