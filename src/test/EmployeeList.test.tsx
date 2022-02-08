import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmployeeList } from '../page/EmployeeList';
import { BrowserRouter } from 'react-router-dom';

describe('Unit Testing of Employee List', () => {
  test('should render Employee List', () => {
    render(
      <BrowserRouter>
        <EmployeeList />
      </BrowserRouter>
    );
    const emplGridEl: HTMLElement[] = screen.getAllByTestId('employee-grid');
    expect(emplGridEl).toHaveLength(1);
  });
  
});
