import React from 'react';
import { EmployeeForm } from '../component/EmployeeForm';
import { Employee as EmployeeInterface } from '../interfaces';

export const CreateEmployee: React.FC<{}> = () => {
  const employeeData:EmployeeInterface = {
    id: 0,
    name: ''
  };
  
  return (
    <div data-testid='employee-form-test-id'>
      <EmployeeForm Employee={employeeData}/>
    </div>
  );
}

