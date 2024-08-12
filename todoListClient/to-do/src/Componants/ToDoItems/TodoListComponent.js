import React from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";

export default function TodoListComponent({ filteredItems, editItem, editValue, handleEditClick, handleEditInputChange, handleKeyPress, deleteTodoListItem, updateItemCompletionStatus }) {
    return (
        <ul className="todoItems">
            {filteredItems.map(item => (
                <li key={item.id} className={`listItemDetails ${item.isCompleted ? 'completed' : ''}`}>
                    {editItem && editItem.id === item.id ? (
                        <>
                            <input
                                type="text"
                                value={editValue}
                                onChange={handleEditInputChange}
                                className='inputListItemValue'
                                onKeyDown={handleKeyPress}
                            />
                        </>
                    ) : (
                        <>
                            <label className='custom-checkbox'>
                                <input
                                    type="checkbox"
                                    checked={item.isCompleted}
                                    onChange={() => updateItemCompletionStatus(item)}
                                    className='chckbox'
                                />
                                <span className="checkmark"></span>
                            </label>
                            <span className='itemName'> {item.title} </span>
                            <GrEdit className='editBtnList' onClick={() => handleEditClick(item)} />
                            <RiDeleteBin5Line className='deleteItem' onClick={() => deleteTodoListItem(item.id)} />
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}
