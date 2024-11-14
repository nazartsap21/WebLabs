import React, {FC} from 'react';
import './SortMenu.scss';
import Select from "../../common/Select/Select";
import {ISearchOptions} from "../../../interfaces/commonInterfaces";

interface SortMenuProps {
    setSearchOptions: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const SortMenu: FC<SortMenuProps> = ({ setSearchOptions }) => {
    return (
        <form className={'sort-menu'}>
            <label htmlFor="sort">Sort:</label>
            <Select
                name={"None"}
                values={["sooner", "later", "a-z", "z-a"]}
                options={["By due date (sooner first)", "By due date (later first)", "A-Z", "Z-A"]}
                value={""}
                onChange={setSearchOptions}
            />
        </form>
    );
};

export default SortMenu;