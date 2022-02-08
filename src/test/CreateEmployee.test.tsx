import React from 'react';
import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CreateEmployee } from '../page/CreateEmployee';
import { Employee as EmployeeInterface } from '../interfaces';

describe('Unit Testing of Create Employee', () => {
  test('should render Create Employee', () => {
    render(
      <BrowserRouter>
        <CreateEmployee />
      </BrowserRouter>
    );
    const emplFormEl: HTMLElement[] = screen.getAllByTestId('employee-form-test-id');
    expect(emplFormEl).toHaveLength(1);
  });
});
