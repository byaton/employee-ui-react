import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen, act, fireEvent  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectForm, IProps } from '../component/ProjectForm';
import * as apiCalls from '../util/apiCalls';
import { Employee as EmployeeInterface, Project as ProjectInterface } from '../interfaces';

const projects: ProjectInterface[] = [
  {id: 1, name: 'Project1', description: 'Proj Desc1', startDate: '2022-09-02', empIds: [2, 3]},
  {id: 2, name: 'Project11', description: 'Proj Desc11', startDate: '2022-09-02', empIds: [2, 3]},
  {id: 3, name: 'Project2', description: 'Proj Desc2', startDate: '2022-07-05', empIds: [1, 3]},
  {id: 4, name: 'Project3', description: 'Proj Desc3', startDate: '2022-05-09', empIds: [4, 6]}
];

const employees: EmployeeInterface[] = [
  {id: 1, name: 'Amit1'},
  {id: 2, name: 'Amit2'},
  {id: 3, name: 'Amit3'}
];
    
describe('Unit Testing of Project Form', () => {
  const projProps: IProps = {
    Project: {
      id: 0,
      name: '',
      description: '',
      startDate: '',
      empIds: []
    }
  };

  beforeEach(() => {
    jest.spyOn(apiCalls, 'getEmployees').mockResolvedValueOnce(employees);
  });

  test('should render the Project Form', async () => {
    render(
      <BrowserRouter>
        <ProjectForm {...projProps}/>
      </BrowserRouter>
    );

    await act(() => Promise.resolve());

    const projLevelEl: HTMLElement = screen.getByTestId('project-levels');
    const projectValuesEl: HTMLElement = screen.getByTestId('project-values');
    const empButtonEl: HTMLElement = screen.getByText(/save/i);

    expect(projectValuesEl).toBeInTheDocument();
    expect(projLevelEl).toBeInTheDocument();
    expect(empButtonEl).toBeInTheDocument();
  });

  test('Employees are to be retrieved from the server', async () => {
    const employeesFromServer = jest.spyOn(apiCalls, 'getEmployees').mockResolvedValueOnce(employees);
    render(
      <BrowserRouter>
        <ProjectForm {...projProps}/>
      </BrowserRouter>
    );
    await act(() => Promise.resolve());

    const empDetailEl: HTMLElement[] = screen.getAllByTestId('emp-detail');

    expect(employeesFromServer).toHaveBeenCalledTimes(1);
    expect(empDetailEl.length).toEqual(employees.length);
  });
  
  test('should render the screen with Project id from router', async () => {
    const props: IProps ={
      Project: {
        id: 0,
        name: '',
        description: '',
        startDate: '1991-08-09',
        empIds: []
      }
      
    };
    render(
      <MemoryRouter initialEntries={[{pathname: '/createptoject', state: projects[0]}]}>
        <ProjectForm {...props} />
      </MemoryRouter>
    );  
    await act(() => Promise.resolve());
  
    const ProjButtonEl: HTMLElement = screen.getByText(/update/i);

    expect(ProjButtonEl).toBeInTheDocument();
  });

  test('should show the changed value in the text', async () => {
    const projName: string = 'Project Name1';
    const projDesc: string = 'Project Description1';
    const startDate: string = '2012-07-05';
    const empIds: number[] = [1, 3];
  
    render(
      <BrowserRouter>
        <ProjectForm {...projProps} />
      </BrowserRouter>
    );

    await act(() => Promise.resolve());

    const projectNameEl: HTMLInputElement = screen.getByTestId('project-name');
    const projectDescEl: HTMLInputElement = screen.getByTestId('project-desc');
    const projectStartDateEl: HTMLInputElement = screen.getByTestId('project-start-date');
    const projectEmpSelectEl: HTMLSelectElement = screen.getByTestId('project-emp-Select');


    fireEvent.change(projectNameEl, { target: { value: projName } });
    fireEvent.change(projectDescEl, { target: { value: projDesc }});
    fireEvent.change(projectStartDateEl, { target: { value: startDate } });
    fireEvent.change(projectEmpSelectEl, { target: { value: empIds } });
    
    expect(projectNameEl).toHaveValue(projName);
    expect(projectDescEl).toHaveValue(projDesc);
    expect(projectStartDateEl).toHaveValue(startDate);
  });

  test('Projects Data should be saved', async () => {
    const nameToBeSaved = 'Project1';
    const descToBeSaved = 'Project Desc1';
    const startDateToBeSaved = '2022-07-05';
    const empIdsToBeSaved = [1, 3];

    const project: ProjectInterface = {
      id: 5,
      name: nameToBeSaved,
      description: descToBeSaved,
      startDate: startDateToBeSaved,
      empIds: empIdsToBeSaved
    };
    const ProjectsFromServer = jest.spyOn(apiCalls, 'getProjects').mockResolvedValueOnce(projects);
    const mockedSavedProject = jest.spyOn(apiCalls, 'saveProject').mockResolvedValueOnce(200);

    render(
      <BrowserRouter>
        <ProjectForm {...projProps} />
      </BrowserRouter>
    );

    await act(() => Promise.resolve());

    const buttonEl: HTMLButtonElement = screen.getByTestId('project-submit');
    const projectNameEl: HTMLInputElement = screen.getByTestId('project-name');
    const projectDescEl: HTMLInputElement = screen.getByTestId('project-desc');
    const projectStartDateEl: HTMLInputElement = screen.getByTestId('project-start-date');
    const projectEmpSelectEl: HTMLSelectElement = screen.getByTestId('project-emp-Select');

    userEvent.type(projectNameEl, nameToBeSaved);
    userEvent.type(projectDescEl, descToBeSaved);
    userEvent.type(projectStartDateEl, startDateToBeSaved);
    userEvent.selectOptions(projectEmpSelectEl, ['1', '3']);
    

    expect(buttonEl).toBeEnabled();
    fireEvent.click(buttonEl);
    expect(mockedSavedProject).toHaveBeenCalledWith(project);
    await act(() => Promise.resolve());
    expect(ProjectsFromServer).toHaveBeenCalled();
  });

  test('Projects Data could not be saved', async () => {
    const nameToBeSaved = 'Project1';
    const descToBeSaved = 'Project Desc1';
    const startDateToBeSaved = '2022-07-05';
    const empIdsToBeSaved = [1, 3];

    const project: ProjectInterface = {
      id: 1,
      name: nameToBeSaved,
      description: descToBeSaved,
      startDate: startDateToBeSaved,
      empIds: empIdsToBeSaved
    };
    const ProjectsFromServer = jest.spyOn(apiCalls, 'getProjects').mockResolvedValueOnce([]);
    const mockedSavedProject = jest.spyOn(apiCalls, 'saveProject').mockResolvedValueOnce(500);

    render(
      <BrowserRouter>
        <ProjectForm {...projProps} />
      </BrowserRouter>
    );

    await act(() => Promise.resolve());

    const buttonEl: HTMLButtonElement = screen.getByTestId('project-submit');
    const projectNameEl: HTMLInputElement = screen.getByTestId('project-name');
    const projectDescEl: HTMLInputElement = screen.getByTestId('project-desc');
    const projectStartDateEl: HTMLInputElement = screen.getByTestId('project-start-date');
    const projectEmpSelectEl: HTMLSelectElement = screen.getByTestId('project-emp-Select');

    userEvent.type(projectNameEl, nameToBeSaved);
    userEvent.type(projectDescEl, descToBeSaved);
    userEvent.type(projectStartDateEl, startDateToBeSaved);
    userEvent.selectOptions(projectEmpSelectEl, ['1', '3']);
    

    expect(buttonEl).toBeEnabled();
    fireEvent.click(buttonEl);
    expect(mockedSavedProject).toHaveBeenCalledWith(project);
    await act(() => Promise.resolve());
    expect(ProjectsFromServer).toHaveBeenCalled();
  });

});
