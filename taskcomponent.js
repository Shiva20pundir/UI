import React from 'react';

const Task = ({ task, moveTask }) => {
  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {task.status === 'Pending' && (
        <button onClick={() => moveTask(task._id, 'In Progress')}>Start</button>
      )}
      {task.status === 'In Progress' && (
        <button onClick={() => moveTask(task._id, 'Completed')}>Complete</button>
      )}
      {task.status === 'Completed' && <p>{new Date(task.timestamp).toLocaleString()}</p>}
    </div>
  );
};

export default Task;
