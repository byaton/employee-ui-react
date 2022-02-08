import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { screen, render, act, fireEvent } from '@testing-library/react';
import { ProjectGrid, IProps } from '../component/ProjectGrid';
import * as apiCalls from '../util/apiCalls';
import { Employee as EmployeeInterface, Project as ProjectInterface } from '../interfaces';

const projects: ProjectInterface[] = [
      {id: 1, name: 'Project1', description: 'Proj Desc1', startDate: '2022-09-02', empIds: [2, 3]},
      {id: 2, name: 'Project11', description: 'Proj Desc11', startDate: '2022-09-02', empIds: [2, 3]},
      {id: 3, name: 'Project2', description: 'Proj Desc2', startDate: '2022-07-05', empIds: [1, 3]},
      {id: 4, name: 'Project3', description: 'Proj Desc3', startDate: '2022-05-09', empIds: [4, 6]}
    ];

let employees: EmployeeInterface[] = [
      {id: 1, name: 'Amit1'},
      {id: 2, name: 'Amit2'},
      {id: 3, name: 'Amit3'}
    ];

describe('Unit Testing Of Project Grid', () => {
  const props: IProps = {
    projectSearchText: ''
  };

  test('should render the table', async () => {
    render(
      <BrowserRouter>
        <ProjectGrid {...props} />
      </BrowserRouter>
    );

    await act(() => Promise.resolve());

    const tableEl: HTMLElement = screen.getByTestId('project-table');
    expect(tableEl).toBeInTheDocument();
  });
  
  test('should render data in table', async () => {
    const projectsFromServer = jest.spyOn(apiCalls, 'getProjects').mockResolvedValue(projects);

    const {rerender} = render(
      <BrowserRouter>
        <ProjectGrid {...props} />
      </BrowserRouter>
    );

    await act(() => Promise.resolve());


    
    props.projectSearchText = 'Project1';
    rerender(
      <BrowserRouter>
        <ProjectGrid {...props} />
      </BrowserRouter>
    );
    await act(() => Promise.resolve());
    
    const tabRowEl: HTMLElement[] = screen.getAllByTestId('project-data-row');
    expect(projectsFromServer).toHaveBeenCalled();
    expect(tabRowEl.length).toEqual(2);
  
    fireEvent.click(tabRowEl[0]);
    await act(() => Promise.resolve());
  });

});
