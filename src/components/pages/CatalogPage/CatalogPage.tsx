import React, {FC, useState} from 'react';
import CatalogMenu from "../../features/CatalogMenu/CatalogMenu";
import CatalogItems from "../../features/CatalogItems/CatalogItems";


const CatalogPage: FC = () => {
    const [searchOptions, setSearchOptions] = useState<{ search: string, sort: string, period: string, priority: string, subject: string }>({ search: '', sort: 'price', period: '', priority: '', subject: '' });

    return (
        <>
            <CatalogMenu setSearchOptions={setSearchOptions}/>
            <CatalogItems searchOptions={searchOptions} setSearchOptions={setSearchOptions}/>
        </>
    );
};

export default CatalogPage;