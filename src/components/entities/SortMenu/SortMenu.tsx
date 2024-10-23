import React, {FC} from 'react';
import './SortMenu.scss';
import Select from "../../common/Select/Select";

const SortMenu: FC = () => {
    return (
        <form className={'sort-menu'}>
            <label htmlFor="sort">Sort:</label>
            <Select
                name={"None"}
                values={["sooner", "later", "a-z", "z-a"]}
                options={["By due date (sooner first)", "By due date (later first)", "A-Z", "Z-A"]}
                onChange={e => {}}
            />
        </form>
    );
};

export default SortMenu;