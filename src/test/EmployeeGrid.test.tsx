import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EmployeeGrid } from '../component/EmployeeGrid';
import { Employee as EmployeeInterface } from '../interfaces';
import * as apiCalls from '../util/apiCalls';

const employees: EmployeeInterface[] = [
  {id: 1, name: 'Amit1'},
  {id: 2, name: 'Amit2'}
];

describe('Unit Testing of Employee Grid', () => {
  test('should render the grid', () => {
    render(
      <BrowserRouter>
        <EmployeeGrid />
      </BrowserRouter>
    );

    const tableEl: HTMLElement = screen.getByTestId('emp-table');
    expect(tableEl).toBeInTheDocument();
  });

  test('should render the table', async () => {
    const employeesFromServer = jest.spyOn(apiCalls, 'getEmployees').mockResolvedValueOnce(employees);

    render(
      <BrowserRouter>
        <EmployeeGrid />
      </BrowserRouter>
    );
    
    await act(() => Promise.resolve());
    
    const tableRowEl: HTMLElement[] = screen.getAllByTestId('emp-data-row');
    expect(employeesFromServer).toHaveBeenCalled();
    expect(tableRowEl.length).toEqual(employees.length);

    fireEvent.click(tableRowEl[0]);
  });
  
});
