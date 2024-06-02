import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/tasks').then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios.post('http://localhost:3001/tasks', newTask).then(res => {
      setTasks([...tasks, res.data]);
      setNewTask({ title: '', description: '' });
    });
  };

  const moveTask = (id, status) => {
    axios.patch(`http://localhost:3001/tasks/${id}`, { status }).then(res => {
      setTasks(tasks.map(task => (task._id === id ? res.data : task)));
    });
  };

  return (
    <div className="app">
      <div className="task-input">
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task description"
          value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-board">
        <div className="task-column">
          <h2>Pending</h2>
          {tasks.filter(task => task.status === 'Pending').map(task => (
            <Task key={task._id} task={task} moveTask={moveTask} />
          ))}
        </div>
        <div className="task-column">
          <h2>In Progress</h2>
          {tasks.filter(task => task.status === 'In Progress').map(task => (
            <Task key={task._id} task={task} moveTask={moveTask} />
          ))}
        </div>
        <div className="task-column">
          <h2>Completed</h2>
          {tasks.filter(task => task.status === 'Completed').map(task => (
            <Task key={task._id} task={task} moveTask={moveTask} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
