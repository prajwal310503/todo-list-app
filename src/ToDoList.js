import React, { useState, useEffect } from 'react';

function ToDoList() {
  // State Management
  // `tasks` holds the list of tasks.
  // `newTask` holds the value of the new task input field.
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from local storage when the component mounts
  // This useEffect runs only once after the initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks); // Set tasks from local storage to state
    }
  }, []); // Empty dependency array ensures this runs only once

  // Save tasks to local storage whenever `tasks` state changes
  // This useEffect runs every time the `tasks` state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to local storage
  }, [tasks]); // `tasks` as a dependency ensures this runs on changes

  // Function to add a new task
  const addTask = () => {
    // Check if the input field is empty
    if (newTask.trim() === '') {
      alert('Please enter a task');
      return;
    }
    // Check if the task already exists
    if (tasks.some(task => task.text === newTask.trim())) {
      alert('Task already exists');
      return;
    }
    // Create a new task object
    const task = {
      text: newTask.trim(),
      isComplete: false, // Initial state of the task is not completed
    };
    // Update the state with the new task
    setTasks([...tasks, task]);
    // Clear the input field
    setNewTask('');
  };

  // Function to toggle task completion status
  const toggleTaskCompletion = index => {
    // Create a new array of tasks with the completion status toggled
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isComplete: !task.isComplete }; // Toggle completion status
      }
      return task; // Return unchanged task
    });
    // Update the state with the updated tasks
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = index => {
    // Create a new array of tasks excluding the one at the specified index
    const updatedTasks = tasks.filter((_, i) => i !== index);
    // Update the state with the updated tasks
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} // Update `newTask` state on input change
        />
        <button onClick={addTask}>Add Task</button> {/* Call `addTask` on button click */}
      </div>
      <ul className="task-list">
        {/* Render each task */}
        {tasks.map((task, index) => (
          <li key={index} className={task.isComplete ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={() => toggleTaskCompletion(index)} // Toggle completion status on checkbox change
            />
            {task.text}
            <button onClick={() => deleteTask(index)}>Delete</button> {/* Call `deleteTask` on button click */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
