import React, {FC, useState} from 'react';
import CatalogMenu from "../../features/CatalogMenu/CatalogMenu";
import CatalogItems from "../../features/CatalogItems/CatalogItems";
import {IReminder} from "../../../interfaces/reminderInterfaces";


const remindersData: IReminder[] = [
    {
        id: 1,
        title: 'Call mom',
        description: 'Call mom and wish her a happy birthday',
        price: 100,
        dueDate: '2024-10-22T18:14:40.604Z',
        lastUpdated: '2024-10-22T18:14:40.604Z',
    },
    {
        id: 2,
        title: 'Buy groceries',
        description: 'Buy groceries for the week',
        price: 200,
        dueDate: '2024-10-23T18:14:40.604Z',
        lastUpdated: '2024-10-22T18:14:40.604Z',
    },
    {
        id: 3,
        title: 'Send report',
        description: 'Send the report to the manager',
        price: 50,
        dueDate: '2024-10-24T18:14:40.604Z',
        lastUpdated: '2024-10-22T18:14:40.604Z',
    },
    {
        id: 4,
        title: 'Go to the gym',
        description: 'Go to the gym and work out',
        price: 400,
        dueDate: '2024-10-25T18:14:40.604Z',
        lastUpdated: '2024-10-22T18:14:40.604Z',
    }
]

const CatalogPage: FC = () => {
    const [reminders, setReminders] = useState<IReminder[]>(remindersData);
    return (
        <>
            <CatalogMenu reminders={reminders} setReminders={setReminders}/>
            <CatalogItems  reminders={reminders} setReminders={setReminders}/>
        </>
    );
};

export default CatalogPage;