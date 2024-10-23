import React, {FC} from 'react';
import './SearchForm.scss';
import reset from './reset.svg';
import search from './search.svg';

const SearchForm: FC = () => {
    return (
        <form id="search-form" className={'search-form'}>
            <label className={"search-bar"}>
                <label className={"search-input"}>
                    <input type="text" placeholder="Type something..." name="search" id="search-input"/>
                    <button type="reset" id="reset-button"><img src={reset} alt="reset"/></button>
                </label>
                <span className={"vertical-line"}></span>
                <button type="submit" id="search-button"><img src={search} alt="search"/></button>
            </label>
        </form>
    );
};

export default SearchForm;