import React, { useRef, useState } from 'react'
import {
    Container,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
    Box
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  import EditIcon from '@mui/icons-material/Edit';
  import AddIcon from '@mui/icons-material/Add';
import UpgradeIcon from '@mui/icons-material/Upgrade';


function AddItems() {
   const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const editRef=useRef(null)


  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((t, i) =>
      i === editIndex ? { ...t, text: task } : t
    );
    setTasks(updatedTasks);
    setTask('');
    setEditIndex(null); 
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
    editRef.current.focus(); 
  };

  
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };
  return (
    <Container 
    sx={{
       marginTop: '50px',
       width:'80vw',
       display:'flex',
       flexDirection:'column',
      borderRadius:'10px',
       boxShadow:'2px 2px 20px 1px red'
       }}>
    <Typography 
    sx={{
        variant :'h1',
        display:'flex',
        alignItems:'center',
        color:'#a50a2a',
        justifyContent:'center',
        fontSize:'50px',
        fontFamily:'cursive'
    }}
    >
      To-Do List
    </Typography>

  <Box
    sx={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      gap:'5px',
      color:'red',

    }}
    >

  <TextField
      label="Add a new task"
      variant="outlined"
      fullWidth
      value={task}
      onChange={(e) => setTask(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && (editIndex !== null ? updateTask() : addTask())}
      inputRef={editRef}
      sx={{ marginTop: '10px',
        width:'80%',
        height:'60px' 
      }}
    />   
      
 <AddIcon
       variant="contained"
       color="primary"
       fullWidth
       onClick={addTask}
       sx={{
         marginTop: '10px',
         width:'10%',
         background:'#134779',
         height:'55px' ,
         borderRadius:'5px' 
       }}
       />

<UpgradeIcon
         variant="contained"
         color="primary"
         fullWidth
         onClick={updateTask}
         sx={{ marginTop: '10px',
           width:'10%',
           height:'55px',
           background:'#134779',
           borderRadius:'5px' 
         }}
      />
    
    </Box>    

    <List sx={{
       marginTop: '20px'
        }}>
      {tasks.map((t, index) => (
        <ListItem key={index} >
         
          <ListItemText
            primary={t.text}
            sx={{
              textDecoration:  'none',
              color: 'black'
            }}
          />

          <ListItemSecondaryAction>
          <IconButton edge="end" onClick={() => editTask(index)}>
                <EditIcon color="warning" />
              </IconButton>
            <IconButton edge="end" onClick={() => deleteTask(index)}>
              <DeleteIcon color="error" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  </Container>
  )
}

export default AddItems