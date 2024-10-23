import React, {FC} from 'react';
import './DeleteButton.scss';


interface DeleteButtonProps {
    onDelete: () => void;
}

const DeleteButton: FC<DeleteButtonProps> = (props) => {
    return (
        <button className={"delete-button"} onClick={() => {props.onDelete(); console.log('delete')}}>Delete</button>
    );
};

export default DeleteButton;