# TodoList

# Project Name:  To-do List

# Project Description:  
# Overview
This To-Do List application is designed to help users manage their tasks efficiently by providing a simple and intuitive interface for creating, editing, and organizing to-do lists and items. Built with React for the front end and Express with Node.js for the backend, the application enables users to:
        Add and manage multiple to-do lists.
        Add, edit, and delete to-do items within each list.
        Filter to-do items by their completion status.
        Download snapshots of their to-do lists.
# Technologies Used
    React
    Express and Node.js

# Content:
                Cloning
                Installation
                Server
                Client
                Running the Application
                Features
                Components
                API End-points
                Styling
                Dependencies
                Conclusion


# Cloning:
Make a folder where you want to clone the project.
Open the terminal.
Change to the directory
		Cd   <name of the directory> 
            Run this command on the terminal.
		git clone https://github.com/kSurjeet/TodoList.git

	If you have visual studio installed in your computer
	After cloning run 
			Code .
	Project will open in the visual studio.
	else	
	  Check your folder it will have a folder with a project.
	It will clone with the folder name TodoList
	Cd TodoList
# Installation:
 
**Client: folder with the name todoListClient**
In terminal<br>

Navigate to the todoListClient directory:<br>
    cd todoListClient<br>
 cd to-do<br>

**Install the dependencies:**
   
    npm install
    npm install axios
    npm install downloadjs
    npm install html2canvas
    npm install tooltip
    npm install react-icons

**Server : folder with the name server**<br>
Navigate to the server directory.<br>
    npm install<br>
    npm install express<br>
    npm install fs<br>
    npm install body-parser<br>

# Running the Application
Open the two instances of the terminal.<br>
Make sure you are starting the server before the client.
# Server:
**In one terminal**<br>
Navigate to the server directory.

**Start the server:**<br>
npm start or node server.js<br>
The server will run on http://localhost:4000

# Client
**Second Terminal:**<br>
Navigate to the client directory here that is to-do.

**Start the client:**<br>
npm start<br>
The client will run on http://localhost:3000.

# Features
**Add To-Do Lists**: Users can add new to-do lists.<br>
**Edit To-Do Lists**: Users can edit the titles of existing to-do lists.<br>
**Delete To-Do Lists**: Users can delete existing to-do lists.<br>
**Add To-Do Itemsc**: Users can add new to-do items to a list.<br>
**Edit To-Do Items**: Users can edit the titles of existing to-do items.<br>
**Delete To-Do Items**: Users can delete existing to-do items.<br>
**Filter To-Do Items**: Users can filter to-do items by their completion status.<br>
**Download Snapshot**: Users can download a snapshot of their to-do list.<br>

# Components
**AddTodoList**
    A component that allows users to add new to-do lists.<br>
**Todolist**
    A component that displays the list of to-do lists and allows users to interact with them (add, edit, delete, select).<br>
**TodoListItems**
A component that displays the items of a selected to-do list and allows users to interact with them (add, edit, delete, mark as complete/incomplete).<br>
**FilterComponent**
    A component that provides filtering options for to-do items.<br>
**InputComponent**
A component that provides an input field for adding new to-do items.<br>
**TodoListComponent**
    A component that displays the filtered to-do items.<br>
**Server.js**
    To handle all server requests.<br>
**todoList.json**
    File Operations: Managing file reads and writes efficiently to handle concurrent operations.<br>

**API Endpoints on client Side**<br><br>
    ***GET /todos***
    Fetch all to-do lists.<br>
    **GET /todos/{listid}**
    Fetch a specific to-do list by ID.<br>
    **POST /todos**
    Create a new to-do list.<br>
    **POST /todos/{listid}/todoItems/{itemid}**
    Add a new item to a specific to-do list by ID.<br>
   **PUT /todos/{listid}**
    Update a to-do list by ID.<br>
   **PUT /todos/{listid}/todoItems/{itemid}**
    Update a specific item in a to-do list by list ID and item ID.<br>
    **DELETE /todos/{listId}**
    Delete a to-do list by ID.<br>
    **DELETE /todos/{listid}/todoItems/{itemid}**
    Delete a specific item in a to-do list by list ID and item ID.<br>

**API Endpoints on server Side**<br><br>
    ***GET /todos***
    Retrieve the list of all to-do lists.<br>
    Response<br>
    Status 200: Returns an array of to-do lists.<br>
    Status 204: If the list is empty.<br>
    Status 500: If there's an error reading the list.<br><br>
  **GET /todos/:id**
    Retrieve a specific to-do list by ID.<br>
    Response<br>
    Status 200: Returns the to-do list.<br>
    Status 204: If the list is empty.<br>
    Status 404: If the to-do list is not found.<br><br>
   ***POST /todos***
    Create a new to-do list.<br>
    Request Body<br>
    id: Unique identifier for the to-do list.<br>
    title: Title of the to-do list.<br>
    todoItems: Array of to-do items.<br>
    Response<br>
    Status 201: Returns the created to-do list.<br>
    Status 400: If the provided data is invalid.<br><br>
    ***POST /todos/:id/todoItems***
    Add a new item to a specific to-do list.<br>
    Request Body<br>
    id: Unique identifier for the item.<br>
    title: Title of the item.<br>
    date: Date of the item.<br>
    isCompleted: Completion status.<br>
    Response<br>
    Status 201: Item added successfully.<br>
    Status 400: If the provided data is invalid.<br>
    Status 404: If the to-do list is not found.<br><br>
   **PUT /todos/:id**<br>
    Update the title of a specific to-do list.<br>
    Request Body<br>
    title: New title for the to-do list.<br>
    Response<br>
    Status 200: Returns the updated to-do list.<br>
    Status 404: If the to-do list is not found.<br><br>
   **PUT /todos/:id/todoItems/:itemId**<br>
    Update a specific item within a to-do list.<br>
    Request Body<br>
    title: New title for the item.<br>
    date: New date for the item.<br>
    isCompleted: New completion status.<br>
    Response<br>
    Status 200: Returns the updated item.<br>
    Status 404: If the to-do list or item is not found.<br><br>
    **DELETE /todos/:id/todoItems/:itemId**<br>
    Delete a specific item from a to-do list.<br>
    Response<br>
    Status 204: Item deleted successfully.<br>
    Status 404: If the to-do list or item is not found.<br><br>
    **DELETE /todos/:id**<br>
    Delete a specific to-do list.<br>
    Response<br>
    Status 204: To-do list deleted successfully.<br>
    Status 404: If the to-do list is not found.<br><br>

**Styling**<br>
    The project uses custom CSS for styling. The CSS file is located at todoListClient/to-do/Components/src/Todo/TodoList.css.<br>

**Dependencies**<br>
    Client
    React
    Axios
    react-icons
    react-tooltip
    html2canvas
    downloadjs
    Server
    Express
    body-parser
    fs
    path
**Conclusion**<br>

**Server-Side**<br>
    The server-side of this application, built with Express and Node.js, provides a robust API for managing to-do lists and their items. Key functionalities include creating, reading, updating, and deleting to-do lists and items. The use of the fs module for file operations ensures that data is persistently stored in a JSON file, making it easy to manage and retrieve tasks. Despite its simplicity, this approach allows for flexibility in managing tasks, and the server efficiently handles various edge cases and error conditions. <br>
**Client-Side**<br>
    The client-side of the application interacts with the server via HTTP requests to perform CRUD operations on to-do lists and items. It features a user-friendly interface for managing tasks, with forms for adding and editing to-do lists and items. By using React and state management techniques, the client-side ensures a dynamic and responsive user experience. The application’s design allows for easy navigation and interaction, making task management straightforward and efficient.
    Together, both the server and client sides form a cohesive system that addresses fundamental to-do list application  needs.
