import React, {FC} from 'react';
import './Select.scss';

interface SelectProps {
    name: string,
    values: Array<string>,
    options: Array<string>,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<SelectProps> = (props) => {
    return (
        <select className={"select"}  onChange={props.onChange}>
            <option value={""}>{props.name}</option>
            {props.values.map((value, index) => {
                return <option key={index} value={value}>{props.options[index]}</option>
            })}
        </select>
    );
};

export default Select;