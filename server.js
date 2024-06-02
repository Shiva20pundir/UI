const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/todo_app', { useNewUrlParser: true, useUnifiedTopology: true });

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'Pending' },
  timestamp: Date
});

const Task = mongoose.model('Task', TaskSchema);

app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  res.send(task);
});

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const task = await Task.findById(id);
  if (status === 'Completed') {
    task.timestamp = new Date();
  }
  task.status = status;
  await task.save();
  res.send(task);
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
