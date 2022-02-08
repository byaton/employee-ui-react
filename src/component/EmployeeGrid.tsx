import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees } from '../util/apiCalls';
import { 
  Employee as EmployeeInterface, 
  EmployeeColumnDef as EmployeeColumnDefInterface } from '../interfaces';
import '../App.css';

interface IState {
  Employee: EmployeeInterface,
  EmployeeColumnDef: EmployeeColumnDefInterface,
}

export const EmployeeGrid: React.FC<{}> = (): JSX.Element => {
  const [rowData, setRowData] = useState<IState['Employee'][]>([]);
  const [columnDef, setColumnDef] = useState<IState['EmployeeColumnDef'][]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // let localRowData: EmployeeInterface[] = [
    //   {id: 1, name: 'Amit1'},
    //   {id: 2, name: 'Amit2'},
    //   {id: 3, name: 'Amit3'}
    // ];

    const getEmployeesFromServer = async (): Promise<void> => {
      const serverEmployeeData: EmployeeInterface[] = await getEmployees();;
      setRowData(serverEmployeeData);
    }
    getEmployeesFromServer();
    
    const localColData: EmployeeColumnDefInterface[] = [
      {key: 'id', name: 'Id'},
      {key: 'name', name: 'Name'} 
    ];
    
    setColumnDef(localColData);
  }, []);

  const onRowClick = (row: EmployeeInterface): void => {
    const rowEmployee: EmployeeInterface = row;
    navigate('/createemployee', {
      state: rowEmployee
    });
  }

  return (
    <div
      style={{ marginTop: '10ch', marginLeft: '70ch' }}
    >
      <table data-testid='emp-table'>
        <thead>
          <tr data-testid='emp-header-row'>
            {columnDef.map(m => <th data-testid="emp-header" key={`${m.key}`}>{`${m.name}`}</th>)}
          </tr>
        </thead>
        <tbody>
          {rowData.map((rd, index) => <tr data-testid='emp-data-row' key={`${index}`} onClick={onRowClick.bind(this, rd)} >
            {Object.values(rd).map((r, rId) => <td data-testid='emp-data' key={`${rId}`}>{`${r}`}</td>)}
          </tr>)}
        </tbody>
      </table>
    </div>
);
}