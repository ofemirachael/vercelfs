import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilterComponent from './FilterComponent';
import InputComponent from './InputComponent';
import TodoListComponent from './TodoListComponent';
import { IoDownloadOutline } from "react-icons/io5";
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import { Tooltip } from 'react-tooltip';

export default function TodoListItems1({ listId, listTitle }) {
    const [todoItems, setTodoItems] = useState([]);  // State to hold list items
    const [message, setMessage] = useState('');  // State to hold message after deletion, add, update
    const [showInput, setShowInput] = useState(false);  // show input to add list items
    const [addListItemValue, setAddListItemValue] = useState('');   // Value to add to list
    const [editItem, setEditItem] = useState(null);  // which item is editing
    const [editValue, setEditValue] = useState('');  // value after editing
    const [filter, setFilter] = useState('all');   // to filter list not completed, completed and all
    const [filteredItems, setFilteredItems] = useState([]);  // to hold filtered items

    // function to call on first load with list ID
    useEffect(() => {
        if (listId) {
            fetchTodoItems();
        }
    }, [listId]);
    // filtered results 
    useEffect(() => {
        applyFilter();
    }, [todoItems, filter]);

    //to fetch all List Items
    const fetchTodoItems = async () => {
        try {
            const res = await axios.get(`/todos/${listId}`);
            if (res.status === 200) {
                setMessage('');
                setTodoItems(res.data.todoItems || []);
            } else {
                setMessage('Todo items list is empty');
                setTodoItems([]);
            }
        } catch (error) {
            setMessage('Error fetching todo items');
        }
    };
// to add list item
    const handleAddItem = () => {
        setShowInput(true);
        addTodoListItems();
    };
 //to add function for posting list items
    const addTodoListItems = async () => {
        if (addListItemValue.trim()) {
            try {
                const newItem = {
                    id: new Date().getTime(),
                    title: addListItemValue,
                    isCompleted: false,
                    date: new Date().toISOString().split('T')[0],
                };
                await axios.post(`/todos/${listId}/todoItems`, newItem);
                setMessage('Item added successfully');
                fetchTodoItems();
                setAddListItemValue('');
                setShowInput(false);
            } catch (error) {
                setMessage('Error adding todo item');
            }
        }
    };
// to update list item title
    const updateTodoListItem = async () => {
        if (editValue.trim()) {
            try {
                const updatedItem = { ...editItem, title: editValue };
                await axios.put(`/todos/${listId}/todoItems/${editItem.id}`, updatedItem);
                setMessage('Item updated successfully');
                fetchTodoItems();
                setEditItem(null);
                setEditValue('');
            } catch (error) {
                setMessage('Error updating todo item');
            }
        }
    };
 // to remove list item
    const deleteTodoListItem = async (itemId) => {
        try {
            await axios.delete(`/todos/${listId}/todoItems/${itemId}`);
            setMessage('Item deleted successfully');
            fetchTodoItems();
        } catch (error) {
            setMessage('Error deleting todo item');
        }
    };
 // to handle edit title
    const handleEditClick = (item) => {
        setEditItem(item);
        setEditValue(item.title);
    };

    const handleInputChange = (e) => {
        setAddListItemValue(e.target.value);
    };

    const handleEditInputChange = (e) => {
        setEditValue(e.target.value);
    };

    const updateItemCompletionStatus = async (item) => {
        try {
            const updatedItem = { ...item, isCompleted: !item.isCompleted };
            await axios.put(`/todos/${listId}/todoItems/${item.id}`, updatedItem);
            setMessage('Item completion status updated successfully');
            fetchTodoItems();
        } catch (error) {
            setMessage('Error updating completion status');
        }
    };
//to set filter value
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const applyFilter = () => {
        let items = [...todoItems];
        if (filter === 'completed') {
            items = items.filter(item => item.isCompleted);
        } else if (filter === 'notCompleted') {
            items = items.filter(item => !item.isCompleted);
        }
        setFilteredItems(items);
    };
// call function to add list with enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            updateTodoListItem();
        }
    };

    const handleKeyPresstoAdd = (e) => {
        if (e.key === 'Enter') {
            handleAddItem();
        }
    };
// to download image of todoList
    const handleCaptureClick = async () => {
        try {
            const todoElmt = document.querySelector('.todoItemsContainer');
            const canvas = await html2canvas(todoElmt);
            const dataURL = canvas.toDataURL('image/png');
            downloadjs(dataURL, 'to-do.png', 'image/png');
        } catch (error) {
            console.error('Error capturing or downloading the image:', error);
        }
    };

    return (
        <div className='todoItemsContainer'>
            <Tooltip id='tip' style={{ color: "#cdc4df", backgroundColor: '#78659e', borderRadius: '10px' }} />
            <IoDownloadOutline className='downloadImg' onClick={handleCaptureClick}  data-tooltip-id="tip"
                                    data-tooltip-content="Download snapshot of your to-do"
                                    data-tooltip-place="left-start"/>
            <h1 className='heading' style={{color:"#78659e"}}>{listTitle}</h1>
            <FilterComponent filter={filter} handleFilterChange={handleFilterChange} />
            <InputComponent
                showInput={showInput}
                addListItemValue={addListItemValue}
                handleInputChange={handleInputChange}
                handleAddItem={handleAddItem}
                handleKeyPresstoAdd={handleKeyPresstoAdd}
                setShowInput={setShowInput}
            />
            <TodoListComponent
                filteredItems={filteredItems}
                editItem={editItem}
                editValue={editValue}
                handleEditClick={handleEditClick}
                handleEditInputChange={handleEditInputChange}
                handleKeyPress={handleKeyPress}
                deleteTodoListItem={deleteTodoListItem}
                updateItemCompletionStatus={updateItemCompletionStatus}
            />
            {message && <p className="message">{message}</p>}
        </div>
    );
}
