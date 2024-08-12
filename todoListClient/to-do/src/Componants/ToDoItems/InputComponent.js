import React, { useRef,useEffect } from 'react';
import { MdAddCircleOutline } from "react-icons/md";

export default function InputComponent({ showInput, addListItemValue, handleInputChange, handleAddItem, handleKeyPresstoAdd,setShowInput }) {
    const inputRef = useRef(null);  // to refer the input field to hide
    
     //to remove input field
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
 // to hide input element when click outside
    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setShowInput(false);
        }
    };
    return (
        <div className='addListItemContainer'>
            {showInput && (
                <input
                    type="text"
                    value={addListItemValue}
                    onChange={handleInputChange}
                    placeholder='Enter'
                    className='inputListItemValue'
                    onKeyDown={handleKeyPresstoAdd}
                    ref={inputRef}
                />
            )}
            <MdAddCircleOutline className='addListItemBtn' onClick={handleAddItem} />
        </div>
    );
}
