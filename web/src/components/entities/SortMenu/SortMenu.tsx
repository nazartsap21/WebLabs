import React, {FC} from 'react';
import './SortMenu.scss';
import Select from "../../common/Select/Select";
import {ISearchOptions} from "../../../interfaces/commonInterfaces";

interface SortMenuProps {
    setSearchOptions: React.Dispatch<React.SetStateAction<ISearchOptions>>;
}
const SortMenu: FC<SortMenuProps> = (props) => {
    return (
        <form className={'sort-menu'}>
            <label htmlFor="sort">Sort:</label>
            <Select
                name={"None"}
                values={["sooner", "later", "a-z", "z-a"]}
                options={["By due date (sooner first)", "By due date (later first)", "A-Z", "Z-A"]}
                value={""}
                onChange={e => {props.setSearchOptions(prev => ({...prev, sort: e.target.value}))}}
            />
        </form>
    );
};

export default SortMenu;