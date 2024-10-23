import React, {FC} from 'react';
import './MoreButton.scss';

interface MoreButtonProps {
    name: string;
}

const MoreButton: FC<MoreButtonProps> = (props) => {
    return (
        <button className={'view-more'}>{props.name}</button>
    );
};

export default MoreButton;