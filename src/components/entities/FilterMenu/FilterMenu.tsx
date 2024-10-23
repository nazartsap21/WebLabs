import React, {FC} from 'react';
import './FilterMenu.scss';
import Select from "../../common/Select/Select";

const FilterMenu: FC = () => {
    return (
        <form className={'filter-menu'}>
            <label>Filters</label>
            <Select
                name={"Time period"}
                values={["1d", "1w", "1m", "1m+"]}
                options={["1 day", "1 day - 1 week", "1 week - 1 month", "1 month+"]}
                onChange={e => {}}
            />
            <Select
                name={"Priority"}
                values={["1", "2", "3", "4", "5"]}
                options={["First priority", "Second priority", "Third priority", "Fourth priority", "Fifth priority"]}
                onChange={e => {}}
            />
            <Select
                name={"Subject"}
                values={["family", "health", "job", "education", "hobby", "others"]}
                options={["Family", "Health", "Job", "Education", "Hobby", "Others"]}
                onChange={e => {}}
            />
        </form>
    );
};

export default FilterMenu;