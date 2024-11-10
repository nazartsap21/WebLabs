import React, {FC} from 'react';
import './UpdateButton.scss';

interface UpdateButtonProps {
    onUpdateModal: () => void;
}

const UpdateButton: FC<UpdateButtonProps> = (props) => {
    return (
        <button className={"update-button"} onClick={() => props.onUpdateModal()}>Update</button>
    );
};

export default UpdateButton;