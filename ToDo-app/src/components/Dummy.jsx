// App.js
import React, { useState, useRef } from 'react';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // New state to track edit mode
  const inputRef = useRef(null); // Reference to focus on TextField

  // Add a new task
  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  // Update an existing task
  const updateTask = () => {
    const updatedTasks = tasks.map((t, i) =>
      i === editIndex ? { ...t, text: task } : t
    );
    setTasks(updatedTasks);
    setTask('');
    setEditIndex(null); // Reset edit mode
  };

  // Set task to be edited
  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
    inputRef.current.focus(); // Focus the input field
  };

  // Toggle task completion
  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        To-Do List
      </Typography>
      <TextField
        label="Add a new task"
        variant="outlined"
        fullWidth
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && (editIndex !== null ? updateTask() : addTask())}
        inputRef={inputRef} // Set reference to focus the field
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={editIndex !== null ? updateTask : addTask}
        style={{ marginTop: '10px' }}
      >
        {editIndex !== null ? 'Update Task' : 'Add Task'}
      </Button>

      <List style={{ marginTop: '20px' }}>
        {tasks.map((t, index) => (
          <ListItem key={index} button onClick={() => toggleComplete(index)}>
            <Checkbox
              checked={t.completed}
              onChange={() => toggleComplete(index)}
            />
            <ListItemText
              primary={t.text}
              style={{
                textDecoration: t.completed ? 'line-through' : 'none',
                color: t.completed ? 'gray' : 'black'
              }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => editTask(index)}>
                <EditIcon color="primary" />
              </IconButton>
              <IconButton edge="end" onClick={() => deleteTask(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
