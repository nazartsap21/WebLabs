import React, {FC, useState} from 'react';
import CatalogMenu from "../../features/CatalogMenu/CatalogMenu";
import CatalogItems from "../../features/CatalogItems/CatalogItems";
import {ISearchOptions} from "../../../interfaces/commonInterfaces";
import {IReminder} from "../../../interfaces/reminderInterfaces";


const CatalogPage: FC = () => {
    const [searchOptions, setSearchOptions] = useState<ISearchOptions>({ search: '', sort: '', price: '', date: '', subject: '' });
    const [reminders, setReminders] = useState<IReminder[]>([]);

    return (
        <>
            <CatalogMenu
                reminders={reminders}
                setReminders={setReminders}
                searchOptions={searchOptions}
                setSearchOptions={setSearchOptions}
            />
            <CatalogItems
                reminders={reminders}
                setReminders={setReminders}
                searchOptions={searchOptions}
                setSearchOptions={setSearchOptions}
            />
        </>
    );
};

export default CatalogPage;