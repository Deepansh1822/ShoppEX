import React from 'react';
// import './SearchBox.css';
import './SearchBox.pro.css';

const SearchBox = ({ searchText, setSearchText }) => {
    return (
        <div className="search-box-container">
            <div className="input-group">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search items..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <span className="input-group-text bg-warning text-dark">
                    <i className="bi bi-search"></i>
                </span>
            </div>
        </div>
    );
};

export default SearchBox;
