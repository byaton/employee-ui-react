import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className='nav-items'>
        <nav>
          <Link to='employeegrid'>Employee Grid</Link>
        </nav> |
        <nav>
          <Link to="projectgrid">Project Grid</Link>
        </nav> |
        <nav>
          <Link to="createemployee">Create Employee</Link>
        </nav> |
        <nav>
          <Link to="createproject">Create Project</Link>
        </nav>
      </div>
    </div>
  );
}

export default App;
