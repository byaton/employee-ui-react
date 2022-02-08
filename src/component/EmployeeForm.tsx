import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Employee as EmployeeInterface } from '../interfaces';
import { saveEmployee, getEmployees } from '../util/apiCalls';

export interface IProps {
  Employee: EmployeeInterface
}

export const EmployeeForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [emplId, setEmpId] = useState<number>(0);
  const [empName, setEmpName] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    if(!!location.state) {
      const locEmployee: EmployeeInterface = location.state as EmployeeInterface;
      setEmpId(locEmployee.id);
      setEmpName(locEmployee.name);
    } else {
      getEmployeesFromServer();
    }
  }, [])

  const empNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const empName = e.target.value;
    setEmpName(empName);
  }

  const getEmployeesFromServer = async (): Promise<void> => {
    const serverEmployeeData: EmployeeInterface[] = await getEmployees();
    const maxEmpId = Math.max(...serverEmployeeData.map(m => m.id));
    setEmpId(maxEmpId + 1);
  }

  const employeeSubmitHandler = () => {
    const employee: EmployeeInterface = {
      id: emplId,
      name: empName
    };
    
    
    const saveEmployeeToServer = async (): Promise<void> => {
      const statusCode: number =  await saveEmployee(employee);
      if (statusCode === 200) {
        getEmployeesFromServer();
      }
    }

    saveEmployeeToServer();
   
  }

  const getButtonText = (): string => !!location.state ? 'update' : 'save';

  const getDisableStatus = (): boolean => !empName;

  return (
    <div className='all-values'>
      <div className='label-buttons'>
        <div className='label-headers'>
          <label>Employee ID</label>
          <label>Employee Name</label>
        </div>
        <div className='label-values'>
          <span data-testid='emp-id-test-id'>{ emplId }</span>
          <input data-testid='emp-name-test-id'  type="text" value={ empName } onChange={empNameChangeHandler.bind(this)} />
        </div>
      </div>
      
      
      <input data-testid='emp-submit-test-id' className='submit-button' type='button' value={getButtonText()} disabled={getDisableStatus()} onClick={employeeSubmitHandler.bind(this)} />
    </div>
  );
}