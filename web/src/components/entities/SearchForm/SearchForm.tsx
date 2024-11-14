import React, { FC} from 'react';
import './SearchForm.scss';
import reset from './reset.svg';
import search from './search.svg';

interface SearchFormProps {
    setSearchOptions: (e: React.ChangeEvent<HTMLInputElement> | null) => void;
}

const SearchForm: FC<SearchFormProps> = ({ setSearchOptions }) => {
    const handleReset = () => {
        setSearchOptions(null);
    };

    return (
        <form id="search-form" className={'search-form'} onSubmit={(e) => {
            e.preventDefault();
        }}>
            <label className={"search-bar"}>
                <label className={"search-input"}>
                    <input type="text" placeholder="Type something..." name="search" id="search-input" onChange={setSearchOptions} />
                    <button type="reset" id="reset-button" onClick={handleReset}><img src={reset} alt="reset" /></button>
                </label>
                <span className={"vertical-line"}></span>
                <button type="submit" id="search-button"><img src={search} alt="search" /></button>
            </label>
        </form>
    );
};

export default SearchForm;