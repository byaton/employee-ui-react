import { apiProjects } from './../test/apiCalls.test';
import axios from 'axios';
import {
  ProjectToUpdate, 
  EmployeeToUpdate,
  ApiProject,
  Project as ProjectInterface, 
  Employee as EmployeeInterface } from '../interfaces';

export const getEmployees = async (): Promise<EmployeeInterface[]> => {
  let listEmployees: EmployeeInterface[] = [];
  try {
    const empData = await axios.get("http://localhost:3000/employees");
    listEmployees = empData.data as EmployeeInterface[];
  } catch (error) {
    //console.error('Error: Err01', error);
  }
  
  return listEmployees;
}

export const getProjects = async (): Promise<ProjectInterface[]> => {
  let listServerProjects: ApiProject[] = [];
  try {
    const projectData = await axios.get("http://localhost:3000/projects");
    listServerProjects = projectData.data as ApiProject[];
  } catch (error) {
    //console.error('Error: Err02', error);
  }
  
  return convertToProject(listServerProjects);

}

export const convertToProject = (apiProject: ApiProject[]): ProjectInterface[] => {
  const listProject: ProjectInterface[] = [];
  apiProject.forEach(ap => listProject.push({
    id: ap.id,
    name: ap.name,
    description: ap.description,
    startDate: ap.date,
    empIds: ap.empIds
  }));

  return listProject;
}

export const saveEmployee = async (employee: EmployeeInterface): Promise<number> => {
  let statusCode: number = 500;
  try {
    const saveEmployee = await axios.post("http://localhost:3000/employees", employee);
    statusCode = saveEmployee.status;
  } catch (error) {
    //console.error('Error: Err03', error);
  }
  
  return statusCode;
}

export const saveProject = async (project: ProjectInterface): Promise<number> => {
  let statusCode: number = 500;
  try {
    const saveProject = await axios.post("http://localhost:3000/projects", project);
    statusCode = saveProject.status;
  } catch (error) {
    //console.error('Error: Err04', error);
  }
  
  return statusCode;
}

export const updateEmployee = async (employee: EmployeeInterface): Promise<number> => {
  const empId = employee.id;
  const empToUpdate: EmployeeToUpdate = {
    name: employee.name
  };

  const updateEmployee = await axios.patch(`http://localhost:3000/employees/${empId}`, empToUpdate);
  return updateEmployee.status;
}

export const updateProject = async (project: ProjectInterface): Promise<number> => {
  const projectId = project.id;
  const projectToUpdate: ProjectToUpdate = {
    name: project.name,
    description: project.description,
    startDate: project.startDate,
    empIds: project.empIds
  };

  const updateProject = await axios.patch(`http://localhost:3000/projects/${projectId}`, projectToUpdate);
  return updateProject.status;
}