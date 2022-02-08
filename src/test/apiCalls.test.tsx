import { 
  getEmployees, 
  getProjects, 
  saveEmployee, 
  saveProject, 
  convertToProject,
  updateEmployee,
  updateProject
 } from '../util/apiCalls';
import { 
  Employee as EmployeeInterface, 
  Project as ProjectInterface,
  ApiProject 
} from '../interfaces';
import axios from 'axios';

interface ReturnEmployeeDataInterface {
  data: EmployeeInterface[],
  status: number
}

interface ReturnEmployeeSaveInterface {
  message: string,
  status: number
}


interface ReturnProjectDataInterface {
  data: ApiProject[],
  status: number
}

interface ReturnProjectSaveInterface {
  message: string,
  status: number
}


export const employees: EmployeeInterface[] = [
  {id: 1, name: 'Amit1'},
  {id: 2, name: 'Amit2'}
];

export const projects: ProjectInterface[] = [
  {id: 1, name: 'Project1', description: 'Project Desc1', startDate: '2022-09-01', empIds: [1, 3, 5]},
  {id: 2, name: 'Project2', description: 'Project Desc2', startDate: '2019-07-02', empIds: [2, 4, 6]},
];

export const apiProjects: ApiProject[] = [
  {id: 1, name: 'Project1', description: 'Project Desc1', date: '2022-09-01', empIds: [1, 3, 5]},
  {id: 2, name: 'Project2', description: 'Project Desc2', date: '2019-07-02', empIds: [2, 4, 6]},
];


describe('Unit testing of async API calls', () => {
  

  test('should return Employee data on getEmployees call', async () => {
    const returnData: ReturnEmployeeDataInterface = {
      data: employees,
      status: 200
    };

    const mRes:ReturnEmployeeDataInterface = returnData;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(mRes);
    const empData: EmployeeInterface[] = await getEmployees();
    expect(empData).toEqual(mRes.data);

  });

  test('should return empty Employee data on occurrences of error in getEmployees call', async () => {
    const returnData: ReturnEmployeeDataInterface = {
      data: [],
      status: 500
    };

    const mRes:ReturnEmployeeDataInterface = returnData;

    jest.spyOn(axios, 'get').mockRejectedValueOnce(mRes);
    const empData: EmployeeInterface[] = await getEmployees();
    expect(empData).toEqual(mRes.data);

  });

  test('should return Project data on getProjects call', async () => {
    const returnData: ReturnProjectDataInterface = {
      data: apiProjects,
      status: 200
    };

    const mRes:ReturnProjectDataInterface = returnData;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(mRes);
    const projectData: ProjectInterface[] = await getProjects();
    expect(projectData).toEqual(projects);

  });

  test('should return empty Project data on error in getProjects call', async () => {
    const returnData: ReturnProjectDataInterface = {
      data: [],
      status: 500
    };

    const mRes:ReturnProjectDataInterface = returnData;
  
    jest.spyOn(axios, 'get').mockRejectedValueOnce(mRes);
    const projectData: ProjectInterface[] = await getProjects();
    expect(projectData).toEqual(mRes.data);

  });

  test('should return Project data after conversion', () => {
    const inputApiProjectData: ApiProject[] = apiProjects;
    const outputProjectData: ProjectInterface[] = projects;
    
    const projectData: ProjectInterface[] = convertToProject(inputApiProjectData);
    expect(projectData).toEqual(outputProjectData);

  });

  test('should save Employee data into DB', async () => {
    const returnData: ReturnEmployeeSaveInterface = {
      message: 'employees got saved',
      status: 200
    };

    const mRes:ReturnEmployeeSaveInterface = returnData;

    jest.spyOn(axios, 'post').mockResolvedValueOnce(mRes);
    const statusCode: number = await saveEmployee(employees[0]);
    expect(statusCode).toEqual(mRes.status);

  });

  test('should not save Employee data into DB on Error', async () => {
    const returnData: ReturnEmployeeSaveInterface = {
      message: 'error',
      status: 500
    };

    const mRes:ReturnEmployeeSaveInterface = returnData;

    jest.spyOn(axios, 'post').mockRejectedValueOnce(mRes);
    const statusCode: number = await saveEmployee(employees[0]);
    expect(statusCode).toEqual(mRes.status);

  });

  test('should update Employee data into DB', async () => {
    const returnData: ReturnEmployeeSaveInterface = {
      message: 'employees got saved',
      status: 200
    };

    const mRes:ReturnEmployeeSaveInterface = returnData;

    jest.spyOn(axios, 'patch').mockResolvedValueOnce(mRes);
    const statusCode: number = await updateEmployee(employees[0]);
    expect(statusCode).toEqual(mRes.status);

  });

  test('should save Project data into DB', async () => {
    const returnData: ReturnProjectSaveInterface = {
      message: 'employees got saved',
      status: 200
    };

    const mRes:ReturnProjectSaveInterface = returnData;

    jest.spyOn(axios, 'post').mockResolvedValueOnce(mRes);
    const statusCode: number = await saveProject(projects[0]);
    expect(statusCode).toEqual(mRes.status);

  });

  test('should not save Project data into DB on error', async () => {
    const returnData: ReturnProjectSaveInterface = {
      message: 'error',
      status: 500
    };

    const mRes:ReturnProjectSaveInterface = returnData;

    jest.spyOn(axios, 'post').mockRejectedValueOnce(mRes);
    const statusCode: number = await saveProject(projects[0]);
    expect(statusCode).toEqual(mRes.status);

  });

  test('should update Project data into DB', async () => {
    const returnData: ReturnProjectSaveInterface = {
      message: 'employees got saved',
      status: 200
    };

    const mRes:ReturnProjectSaveInterface = returnData;

    jest.spyOn(axios, 'patch').mockResolvedValueOnce(mRes);
    const statusCode: number = await updateProject(projects[0]);
    expect(statusCode).toEqual(mRes.status);

  });

});
