import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { EmployeeForm, IProps } from '../component/EmployeeForm';
import { Employee as EmployeeInterface } from '../interfaces';
import * as apiCalls from '../util/apiCalls';

const employees: EmployeeInterface[] = [
  {id: 1, name: 'Amit1'},
  {id: 2, name: 'Amit2'}
];

describe('Unit Testing of Employee Form', () => {
  const props: IProps ={
    Employee: {
      id: 0,
      name: ''
    }
  };

  

  beforeEach(() => {
    jest.spyOn(apiCalls, 'getEmployees').mockResolvedValueOnce(employees);
  });

  test('Employees should have been retrieved from server', async () => {
    const employeesFromServer = jest.spyOn(apiCalls, 'getEmployees').mockResolvedValueOnce(employees);
    render(
      <BrowserRouter>
        <EmployeeForm {...props} />
      </BrowserRouter>
    );
    await act(() => Promise.resolve());

    expect(employeesFromServer).toHaveBeenCalledTimes(1);
  });

  test('should render the screen with emp name', async () => {
    render(
      <BrowserRouter>
        <EmployeeForm {...props} />
      </BrowserRouter>
    );
    await act(() => Promise.resolve());

    const empInputEl: HTMLElement[] = screen.getAllByTestId('emp-name-test-id');
    const empButtonEl: HTMLElement = screen.getByText(/save/i);

    expect(empInputEl).toHaveLength(1);
    expect(empButtonEl).toBeInTheDocument();
  });

  test('should render the screen with emp id from router', async () => {
    const employee: EmployeeInterface = {
      id: 1,
      name: 'amit'
    };

    render(
      <MemoryRouter initialEntries={[{pathname: '/createemployee', state: employee}]}>
        <EmployeeForm {...props} />
      </MemoryRouter>
    );
    await act(() => Promise.resolve());
  
    const empButtonEl: HTMLElement = screen.getByText(/update/i);

    expect(empButtonEl).toBeInTheDocument();
  });

  test('should show the changed value in the text', async () => {
    const textTobePassed: string = 'Amit';
  
    render(
      <BrowserRouter>
        <EmployeeForm {...props} />
      </BrowserRouter>
    );

    await act(() => Promise.resolve());

    const inputEl: HTMLInputElement = screen.getByTestId('emp-name-test-id');

    fireEvent.change(inputEl, { target: { value: textTobePassed } });
    expect(inputEl).toHaveValue(textTobePassed);
  });
  
  test('Employees Data should be saved', async () => {
    const nameToBeSaved = 'Amit123';
    const employee: EmployeeInterface = {
      id: 3,
      name: nameToBeSaved
    };
    const employeesFromServer = jest.spyOn(apiCalls, 'getEmployees').mockResolvedValueOnce(employees);
    const mpckedSavedEmployee = jest.spyOn(apiCalls, 'saveEmployee').mockResolvedValueOnce(200);

    render(
      <BrowserRouter>
        <EmployeeForm {...props} />
      </BrowserRouter>
    );

    await act(() => Promise.resolve());

    const buttonEl: HTMLInputElement = screen.getByTestId('emp-submit-test-id');
    const inputEl: HTMLInputElement = screen.getByTestId('emp-name-test-id');

    fireEvent.change(inputEl, { target: { value: nameToBeSaved } });
    fireEvent.click(buttonEl);

    expect(mpckedSavedEmployee).toHaveBeenCalledWith(employee);
    await act(() => Promise.resolve());
    expect(employeesFromServer).toHaveBeenCalled();
  });

  test('Employees Data could not be saved', async () => {
    const nameToBeSaved = 'Amit123';
    const employee: EmployeeInterface = {
      id: 3,
      name: nameToBeSaved
    };
    const employeesFromServer = jest.spyOn(apiCalls, 'getEmployees').mockResolvedValueOnce(employees);
    const mpckedSavedEmployee = jest.spyOn(apiCalls, 'saveEmployee').mockResolvedValueOnce(500);

    render(
      <BrowserRouter>
        <EmployeeForm {...props} />
      </BrowserRouter>
    );

    await act(() => Promise.resolve());

    const buttonEl: HTMLInputElement = screen.getByTestId('emp-submit-test-id');
    const inputEl: HTMLInputElement = screen.getByTestId('emp-name-test-id');

    fireEvent.change(inputEl, { target: { value: nameToBeSaved } });
    fireEvent.click(buttonEl);

    expect(mpckedSavedEmployee).toHaveBeenCalledWith(employee);
    await act(() => Promise.resolve());
    expect(employeesFromServer).toHaveBeenCalled();
  });
  
});
