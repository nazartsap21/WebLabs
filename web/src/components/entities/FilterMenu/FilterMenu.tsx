import React, {FC} from 'react';
import './FilterMenu.scss';
import Select from "../../common/Select/Select";


interface FilterMenuProps {
    setSearchOptions: React.Dispatch<React.SetStateAction<{ search: string, sort: string, price: string, priority: string, subject: string }>>;
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
                name={"Priority"}
                values={["low", "medium", "high"]}
                options={["Low", "Medium", "High"]}
                value={""}
                onChange={e => {props.setSearchOptions(prev => ({...prev, priority: e.target.value}))}}
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