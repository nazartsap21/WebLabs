import React, {FC} from 'react';
import CatalogMenu from "../../features/CatalogMenu/CatalogMenu";
import CatalogItems from "../../features/CatalogItems/CatalogItems";



const CatalogPage: FC = () => {

    return (
        <>
            <CatalogMenu/>
            <CatalogItems/>
        </>
    );
};

export default CatalogPage;