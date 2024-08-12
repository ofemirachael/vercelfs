import React, { useState, useRef, useEffect } from 'react';
import { AiFillFileAdd } from "react-icons/ai";
import '../Todo/TodoList.css';
import { Tooltip } from 'react-tooltip';

export default function AddTodoList({ onAddItem }) {
    const [addListValue, setAddListValue] = useState('');  // state to hold one value to add
    const [showInput, setShowInput] = useState(false);  //state to handle to show input box to add list
    const inputRef = useRef(null);  // to refer the input field to hide

    const handleAddListItem = () => {
        setShowInput(true);
    };
 // to add list item
    const handleAddItem = () => {
        if (addListValue.trim()) {
            onAddItem(addListValue); // Call the parent function to add item
            setAddListValue('');
            setShowInput(false);
        }
    };

// call function to add list with enter
    const handleKeyPress = (e) => {
        if (showInput && e.key === 'Enter') {
            handleAddItem();
        }
    };
 // to hide input element when click outside
    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setShowInput(false);
        }
    };

    //to remove input field

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <Tooltip id='tip' style={{ color: "#cdc4df", backgroundColor: '#78659e', borderRadius: '10px' }} />
            <AiFillFileAdd className='addListBtn' onClick={handleAddListItem} 
                                    data-tooltip-id="tip"
                                    data-tooltip-content="Click to add list"
                                    data-tooltip-place="left-start"/>
            {showInput && (
                <div>
                    <input
                        type="text"
                        value={addListValue}
                        onChange={(e) => setAddListValue(e.target.value)}
                        placeholder="Enter item"
                        className='inputListItem'
                        onKeyDown={handleKeyPress}
                        ref={inputRef}
                    />
                </div>
            )}
        </div>
    );
}
