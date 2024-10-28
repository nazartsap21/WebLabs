import React, {FC} from 'react';
import './MoreButton.scss';

interface MoreButtonProps {
    name: string;
    handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MoreButton: FC<MoreButtonProps> = (props) => {
    return (
        <button className={'view-more'} onClick={props.handleClick}>{props.name}</button>
    );
};

export default MoreButton;