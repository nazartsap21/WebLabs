export interface IReminder {
    id: number;
    title: string;
    description: string;
    price: number;
    dueDate: string;
    subject: string;
    lastUpdated: string;
}

export const defaultReminder: IReminder = {
    id: -1,
    title: '',
    description: '',
    price: 0,
    dueDate: '',
    subject: '',
    lastUpdated: ''
}