import React, {FC, useState} from 'react';
import './SearchForm.scss';
import reset from './reset.svg';
import search from './search.svg';
import {ISearchOptions} from "../../../interfaces/commonInterfaces";

interface SearchFormProps {
    setSearchOptions: React.Dispatch<React.SetStateAction<ISearchOptions>>;
}

const SearchForm: FC<SearchFormProps> = (props) => {
    const [searchInput, setSearchInput] = useState<string>('');
    return (
        <form id="search-form" className={'search-form'} onSubmit={(e) => {
            e.preventDefault();
            props.setSearchOptions(prev => ({...prev, search: searchInput}));
        }}>
            <label className={"search-bar"}>
                <label className={"search-input"}>
                    <input type="text" placeholder="Type something..." name="search" id="search-input" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
                    <button type="reset" id="reset-button" onClick={(e) => {props.setSearchOptions(prev => ({...prev, search: ''})); setSearchInput('')}}><img src={reset} alt="reset"/></button>
                </label>
                <span className={"vertical-line"}></span>
                <button type="submit" id="search-button"><img src={search} alt="search"/></button>
            </label>
        </form>
    );
};

export default SearchForm;