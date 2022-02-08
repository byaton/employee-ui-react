import React from 'react';
import { EmployeeGrid } from '../component/EmployeeGrid'

export const EmployeeList: React.FC<{}> = (): JSX.Element => {
  return (
    <div data-testid='employee-grid'>
      <EmployeeGrid />
    </div>
  );
}