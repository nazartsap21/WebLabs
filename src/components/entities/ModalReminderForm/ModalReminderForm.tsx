import React, {Dispatch, FC, FormEvent, SetStateAction} from 'react';
import './ModalReminderForm.scss';
import {IReminder} from "../../../interfaces/reminderInterfaces";
import Modal from "../../common/Modal/Modal";

interface ModalReminderFormProps {
    reminder: IReminder;
    setReminder: (reminder: IReminder) => void;
    handleSubmit: (e: FormEvent) => void;
    headText: string;
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
}

const ModalReminderForm: FC<ModalReminderFormProps> = ({reminder, setReminder, handleSubmit, headText, active, setActive}) => {
    reminder = {...reminder, dueDate: reminder.dueDate.slice(0, 16)};
    return (
        <Modal headText={headText} active={active} setActive={setActive}>
            <form className='reminder-modal-form' onSubmit={handleSubmit}>
                <label htmlFor={"create-modal-title"}>Title</label>
                <input
                    type={"text"}
                    placeholder={"Title"}
                    name={"modal-title"}
                    value={reminder.title}
                    onChange={(e) => setReminder({...reminder, title: e.target.value})}
                />
                <label htmlFor={"create-modal-description"}>Description</label>
                <textarea
                    placeholder={"Description"}
                    rows={5}
                    name={"modal-description"}
                    value={reminder.description}
                    onChange={(e) => setReminder({...reminder, description: e.target.value})}
                ></textarea>
                <label htmlFor={"create-modal-price"}>Price</label>
                <input
                    type={"number"}
                    placeholder={"Price"}
                    min={0}
                    name={"modal-price"}
                    value={reminder.price}
                    onChange={(e) => setReminder({...reminder, price: Number(e.target.value)})}
                />
                <label htmlFor={"create-modal-due-date"}>Due date</label>
                <input
                    type={"datetime-local"}
                    name={"modal-due-date"}
                    value={reminder.dueDate}
                    onChange={(e) => setReminder({...reminder, dueDate: e.target.value})}
                />
                <button className={'submit-modal'} type={'submit'}>Submit</button>
            </form>
        </Modal>
    );
};

export default ModalReminderForm;