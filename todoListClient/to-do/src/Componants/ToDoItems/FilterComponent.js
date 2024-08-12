import React from 'react';

export default function FilterComponent({ filter, handleFilterChange }) {
    return (
        <div className='filterContainer'>
            <label htmlFor="filter"></label>
            <select id="filter" value={filter} onChange={handleFilterChange} className='dropDown'> 
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="notCompleted">Not Completed</option>
            </select>
        </div>
    );
}
