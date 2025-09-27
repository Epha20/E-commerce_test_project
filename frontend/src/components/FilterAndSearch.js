import React from 'react';

function FilterAndSearch({ onSearch, onFilter }) {
    return (
        <div className="controls">
            <input
                type="text"
                placeholder="Search by customer..."
                onChange={(e) => onSearch(e.target.value)}
            />
            <select onChange={(e) => onFilter(e.target.value)}>
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
            </select>
        </div>
    );
}

export default FilterAndSearch;