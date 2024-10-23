import React, {FC} from 'react';
import './CreateButton.scss';

interface CreateButtonProps {
    name: string;
    CreateModal: () => void;
}

const CreateButton: FC<CreateButtonProps> = (props) => {
    return (
        <button className={'create-reminder'} onClick={props.CreateModal}>{props.name}</button>
    );
};

export default CreateButton;