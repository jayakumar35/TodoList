import './App.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button,Table } from 'react-bootstrap';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [duration, setDuration] = useState('');
  const [unit, setUnit] = useState('minutes'); // => State to store selected unit (minutes or hours)
  const [startTime, setStartTime] = useState('');

  // Load tasks from sessionStorage on component mount
  useEffect(() => {
    const storedTasks = sessionStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
        console.log('Loaded tasks from sessionStorage:', parsedTasks);
      } catch (error) {
        console.error('Error parsing tasks from sessionStorage:', error);
      }
    }
  }, []);

  // Save tasks to sessionStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      sessionStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Tasks saved to sessionStorage:', tasks);
    }
  }, [tasks]);

  // Function to add a task
  const addTask = () => {
    if (!taskName || !duration || !startTime || !unit) {
      alert('Please fill all fields');
      return;
    }

    const newTask = {
      id: Date.now(),
      taskName,
      duration,
      unit,
      startTime,
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
    setDuration('');
    setStartTime('');
    setUnit('minutes'); // Reset to default after task added
  };

  // Function to remove a task
  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <Container className="todo-container">
      <h1 className="text-center mb-4">Responsive To-Do List</h1>

      <Form>
        <Row className="todo-row">
          <Col sm={12} md={12} lg={12} className="todo-col">
            <Form.Control
              className="inputbox"
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <Form.Control
              className="inputbox"
              type="number"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <Form.Select value={unit} onChange={(e) => setUnit(e.target.value)} className="inputbox1">
              <option className="inputbox" value="minutes">Minutes</option>
              <option className="inputbox" value="hours">Hours</option>
            </Form.Select>
            <Form.Control
              className="inputbox3"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Button className="inputbox2" variant="primary" onClick={addTask} block>
              Add Task
            </Button>
          </Col>
        </Row>
      </Form>

      <div className="tasktable">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className=" p-3 mb-2 bg-light rounded">
              <Row className=''>
                <Col sm={3} md={3} xs={12} className='task-item-col' >
   
                  <strong>{task.taskName}</strong> - {task.duration} {task.unit}
                  Start Time: {task.startTime}
              
                
                  <Button variant="danger" onClick={() => removeTask(task.id)} block>
                    Remove
                  </Button>
                  </Col>
              </Row>
            </div>
          ))
        ) : (
          <p>No tasks added yet</p>
        )}
      </div>
    </Container>
  );
}

export default App;
