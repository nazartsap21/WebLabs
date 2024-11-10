import React, {FC} from 'react';
import './ViewMoreButton.scss';
import {Link} from "react-router-dom";

interface ViewMoreButtonProps {
    to: string;
}

const ViewMoreButton: FC<ViewMoreButtonProps> = (props) => {
    return (
        <Link to={props.to}  className={"view-more-button"}>View more</Link>
    );
};

export default ViewMoreButton;