import React, {FC} from 'react';
import './FilterMenu.scss';
import Select from "../../common/Select/Select";
import {ISearchOptions} from "../../../interfaces/commonInterfaces";


interface FilterMenuProps {
    setSearchOptions: React.Dispatch<React.SetStateAction<ISearchOptions>>;
}

const FilterMenu: FC<FilterMenuProps> = (props) => {
    return (
        <form className={'filter-menu'}>
            <label>Filters</label>
            <Select
                name={"Price"}
                values={["0-50", "50-200", "200-500", "500+"]}
                options={["0-50", "50-200", "200-500", "500+"]}
                value={""}
                onChange={e => {props.setSearchOptions(prev => ({...prev, price: e.target.value}))}}
            />
            <Select
                name={"Due Date"}
                values={["1d", "1w", "1m", "1m+"]}
                options={["Today", "1 day - 1 week", "1 week - 1 month", "1 month and more"]}
                value={""}
                onChange={e => {props.setSearchOptions(prev => ({...prev, date: e.target.value}))}}
            />
            <Select
                name={"Subject"}
                values={["family", "health", "job", "education", "hobby", "others"]}
                options={["Family", "Health", "Job", "Education", "Hobby", "Others"]}
                value={""}
                onChange={e => {props.setSearchOptions(prev => ({...prev, subject: e.target.value}))}}
            />
        </form>
    );
};

export default FilterMenu;