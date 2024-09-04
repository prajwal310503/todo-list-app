import React from 'react'; // Import React library for using JSX
import ToDoList from './ToDoList'; // Import the ToDoList component from the local file
import './App.css'; // Import the CSS file for styling the App component

function App() {
  return (
    <div className="App">
      <ToDoList /> {/* Render the ToDoList component */}
    </div>
  );
}

export default App; // Export the App component for use in other parts of the application
