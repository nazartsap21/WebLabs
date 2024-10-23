import React, { createContext, useContext, useState, FC, ReactNode } from 'react';
import remindersData from '../../reminders.json';
import {IReminder} from "../../interfaces/reminderInterfaces";

const flattenedRemindersData: IReminder[] = remindersData.flat();

interface RemindersContextProps {
    reminders: IReminder[];
    setReminders: React.Dispatch<React.SetStateAction<IReminder[]>>;
    filters: { period: string; priority: string; subject: string };
    setFilters: React.Dispatch<React.SetStateAction<{ period: string; priority: string; subject: string }>>;
}

const RemindersContext = createContext<RemindersContextProps | undefined>(undefined);

export const useReminders = () => {
    const context = useContext(RemindersContext);
    if (!context) {
        throw new Error('useReminders must be used within a RemindersProvider');
    }
    return context;
};

export const RemindersProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [reminders, setReminders] = useState<IReminder[]>(flattenedRemindersData);
    const [filters, setFilters] = useState<{ period: string; priority: string; subject: string }>({ period: '', priority: '', subject: '' });

    return (
        <RemindersContext.Provider value={{ reminders, setReminders, filters, setFilters }}>
            {children}
        </RemindersContext.Provider>
    );
};