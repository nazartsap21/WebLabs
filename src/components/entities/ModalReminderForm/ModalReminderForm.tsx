import React, {Dispatch, FC, FormEvent, SetStateAction} from 'react';
import './ModalReminderForm.scss';
import {IReminder} from "../../../interfaces/reminderInterfaces";
import Modal from "../../common/Modal/Modal";
import Select from "../../common/Select/Select";

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
                <label htmlFor={"modal-title"}>Title</label>
                <input
                    type={"text"}
                    placeholder={"Title"}
                    name={"modal-title"}
                    value={reminder.title}
                    onChange={(e) => setReminder({...reminder, title: e.target.value})}
                />
                <label htmlFor={"modal-description"}>Description</label>
                <textarea
                    placeholder={"Description"}
                    rows={5}
                    name={"modal-description"}
                    value={reminder.description}
                    onChange={(e) => setReminder({...reminder, description: e.target.value})}
                ></textarea>
                <label htmlFor={"modal-price"}>Price</label>
                <input
                    type={"number"}
                    placeholder={"Price"}
                    min={0}
                    name={"modal-price"}
                    value={reminder.price}
                    onChange={(e) => setReminder({...reminder, price: Number(e.target.value)})}
                />
                <label htmlFor={"modal-due-date"}>Due date</label>
                <input
                    type={"datetime-local"}
                    name={"modal-due-date"}
                    value={reminder.dueDate}
                    onChange={(e) => setReminder({...reminder, dueDate: e.target.value})}
                />
                <label htmlFor={"modal-priority"}>Priority</label>
                <select
                    name={"modal-priority"}
                    value={reminder.priority}
                    onChange={(e) => setReminder({...reminder, priority: e.target.value})}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <label htmlFor={"modal-subject"}>Subject</label>
                <select
                    name={"modal-subject"}
                    value={reminder.subject}
                    onChange={(e) => setReminder({...reminder, subject: e.target.value})}
                >
                    <option value="family">Family</option>
                    <option value="health">Health</option>
                    <option value="job">Job</option>
                    <option value="education">Education</option>
                    <option value="hobby">Hobby</option>
                    <option value="others">Others</option>
                </select>

                {/*<Select*/}
                {/*    name={"Priority"}*/}
                {/*    values={["low", "medium", "high"]}*/}
                {/*    options={["Low", "Medium", "High"]}*/}
                {/*    value={reminder.priority}*/}
                {/*    onChange={(e) => setReminder({...reminder, priority: e.target.value})}*/}
                {/*/>*/}
                {/*<Select*/}
                {/*    name={"Subject"}*/}
                {/*    values={["family", "health", "job", "education", "hobby", "others"]}*/}
                {/*    options={["Family", "Health", "Job", "Education", "Hobby", "Others"]}*/}
                {/*    value={reminder.subject}*/}
                {/*    onChange={(e) => setReminder({...reminder, subject: e.target.value})}*/}
                {/*/>*/}
                <button className={'submit-modal'} type={'submit'}>Submit</button>
            </form>
        </Modal>
    );
};

export default ModalReminderForm;