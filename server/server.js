const express = require('express');
const app = express();
const fs = require('fs');// to read and write file
const path = require('path');
const bodyParser = require('body-parser');

const port = 4000;
const dataFile = path.join(__dirname, 'todoList.json');

//Middleware
app.use(bodyParser.json());

// Function to read tasks from file
const readTasksFromFile = () => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Function to write tasks to file
const writeTasksToFile = (tasks) => {
  fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2), 'utf8');
};

// Routes
app.get("/", (req, res) => {
  res.send("Hello To Do");
});
//to get to do list
app.get('/todos', (req, res) => {
    const todolist = readTasksFromFile();
    try {
      if (todolist.length === 0) {
        res.status(204).json({ message: 'List is empty', todos: [] });
      } else {
        res.status(200).json(todolist);
      }
    } catch (err) {
      res.status(500).json({ message: 'Error reading the list' });
    }
  });
  
// to get list items with list ID
app.get('/todos/:id', (req, res) => {
    const todolist = readTasksFromFile();
    const todoId = parseInt(req.params.id);
    const todo = todolist.find(t => t.id === todoId);
  
    if (todo) {
      if (todo.todoItems && todo.todoItems.length === 0) {
         res.status(204).send('List is empty'); 
      } else {
        res.json(todo);
      }
    } else {
      res.status(404).send('Todo not found');
    }
  });
  
// to post lists to server
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  const todolist = readTasksFromFile();
  if (!newTodo.id || !newTodo.todoItems || !newTodo.title) {
    return res.status(400).send('Invalid todo data');
  }
  todolist.push(newTodo);
  writeTasksToFile(todolist);
  res.status(201).json(newTodo);
});

// to post list items with given list ID
app.post('/todos/:id/todoItems', (req, res) => {
  const newItem = req.body;
  const todoId = parseInt(req.params.id, 10);
  const todolist = readTasksFromFile();
  const list = todolist.find(item => item.id === todoId);
  if (!newItem.id || !newItem.date || !newItem.title || newItem.isCompleted === undefined) {
    return res.status(400).send('Invalid todo data');
  }

  if (list) {
    list.todoItems.push(newItem);
    writeTasksToFile(todolist);
    return res.status(201).send('Item added successfully');
  } else {
    return res.status(404).send('List not found');
  }
});

// to update list title with given ID
app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const updatedTodo = req.body;
  const todolist = readTasksFromFile();
  const todoIndex = todolist.findIndex(t => t.id === todoId);

  if (todoIndex !== -1) {
    todolist[todoIndex] = { ...todolist[todoIndex], ...updatedTodo };
    writeTasksToFile(todolist);
    res.json(todolist[todoIndex]);
  } else {
    res.status(404).send('Todo not found');
  }
});
// to update list item title with the with item id and list id
app.put('/todos/:id/todoItems/:itemId', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const itemId = parseInt(req.params.itemId, 10);
  const updatedItem = req.body;
  const todolist = readTasksFromFile();

  const list = todolist.find(item => item.id === todoId);

  if (list) {
    const itemIndex = list.todoItems.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
      list.todoItems[itemIndex] = { ...list.todoItems[itemIndex], ...updatedItem };
      writeTasksToFile(todolist);
      return res.json(list.todoItems[itemIndex]);
    } else {
      return res.status(404).send('Todo item not found');
    }
  } else {
    return res.status(404).send('List not found');
  }
});
// to delete list item with item id and list id
app.delete('/todos/:id/todoItems/:itemId', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const itemId = parseInt(req.params.itemId, 10);
  const todolist = readTasksFromFile();

  const list = todolist.find(item => item.id === todoId);

  if (list) {
    const itemIndex = list.todoItems.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
      list.todoItems.splice(itemIndex, 1);
      writeTasksToFile(todolist);
      return res.status(204).send();
    } else {
      return res.status(404).send('Todo item not found');
    }
  } else {
    return res.status(404).send('List not found');
  }
});
// to delete list with given id
app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todolist = readTasksFromFile();
  const index = todolist.findIndex(t => t.id === todoId);

  if (index !== -1) {
    todolist.splice(index, 1);
    writeTasksToFile(todolist);
    res.status(204).send();
  } else {
    res.status(404).send('Todo not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


