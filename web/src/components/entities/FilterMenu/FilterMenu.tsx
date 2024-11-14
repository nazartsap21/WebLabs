import React, {FC} from 'react';
import './FilterMenu.scss';
import Select from "../../common/Select/Select";


interface FilterMenuProps {
    setPriceOptions: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    setDateOptions: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    setSubjectOptions: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterMenu: FC<FilterMenuProps> = ({ setPriceOptions, setDateOptions, setSubjectOptions }) => {
    return (
        <form className={'filter-menu'}>
            <label>Filters</label>
            <Select
                name={"Price"}
                values={["0-50", "50-200", "200-500", "500+"]}
                options={["0-50", "50-200", "200-500", "500+"]}
                value={""}
                onChange={setPriceOptions}
            />
            <Select
                name={"Due Date"}
                values={["1d", "1w", "1m", "1m+"]}
                options={["Today", "1 day - 1 week", "1 week - 1 month", "1 month and more"]}
                value={""}
                onChange={setDateOptions}
            />
            <Select
                name={"Subject"}
                values={["family", "health", "job", "education", "hobby", "others"]}
                options={["Family", "Health", "Job", "Education", "Hobby", "Others"]}
                value={""}
                onChange={setSubjectOptions}
            />
        </form>
    );
};

export default FilterMenu;