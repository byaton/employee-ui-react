import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { CreateProject } from './page/CreateProject';
import { CreateEmployee } from './page/CreateEmployee';
import { EmployeeList } from './page/EmployeeList';
import { ProjectList } from './page/ProjectList';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={< App/>}></Route>
        <Route path='/createproject' element={<CreateProject />}></Route>
        <Route path='/createemployee' element={<CreateEmployee />} ></Route>
        <Route path='/employeegrid' element={<EmployeeList />}></Route>
        <Route path='/projectgrid' element={<ProjectList />}></Route>
      </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
