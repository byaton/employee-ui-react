import React, { useEffect, useState } from 'react';
import { getProjects } from '../util/apiCalls';
import { 
  Project as ProjectInterface, 
  ProjectColumnDef as ProjectColumnDefInterface } from '../interfaces';
import { useNavigate } from 'react-router-dom';
import '../App.css';


interface IState {
  Project: ProjectInterface,
  ProjectColumnDef: ProjectColumnDefInterface
}

export interface IProps {
  projectSearchText: string
}

export const ProjectGrid: React.FC<IProps> = (props: React.PropsWithChildren<IProps>): JSX.Element => {
  const [rowData, setRowData] = useState<IState['Project'][]>([]);
  const [projectRows, setProjectRows] = useState<IState['Project'][]>([]);
  const [columnDef, setColumnDef] = useState<IState['ProjectColumnDef'][]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const sText = props.projectSearchText
    const localRowData = 
      projectRows.filter(f => f.name.indexOf(sText) > -1 ||
      f.description.indexOf(sText) > -1);

    setRowData(localRowData);
  }, [props.projectSearchText]);

  useEffect(() => {
    // const localRowData: ProjectInterface[] = [
    //   {id: 1, name: 'Project1', description: 'Proj Desc1', startDate: '2022-09-02', empIds: [2, 3]},
    //   {id: 2, name: 'Project2', description: 'Proj Desc2', startDate: '2022-07-05', empIds: [1, 3]},
    //   {id: 3, name: 'Project3', description: 'Proj Desc3', startDate: '2022-05-09', empIds: [4, 6]}
    // ];

    const getProjectsFromServer = async (): Promise<void> => {
      const serverProjectData: ProjectInterface[] = await getProjects();

      setRowData(serverProjectData);
      setProjectRows(serverProjectData);
    }

    getProjectsFromServer();

    const localColData: ProjectColumnDefInterface[] = [
      {key: 'id', name: 'Id'},
      {key: 'name', name: 'Name'},
      {key: 'description', name: 'Description'},
      {key: 'startDate', name: 'Start Date'},
      {key: 'empIds', name: 'Employee Ids'}
    ];

    // setRowData(localRowData);
    // setProjectRows(localRowData);
    setColumnDef(localColData);
  }, []);

  const onRowClick = (row: ProjectInterface): void => {
    const project: ProjectInterface = row;
    
    navigate('/createproject', {
      state: project
    });
  }

  return (
    <div
      style={{ marginTop: '10ch', marginLeft: '30ch' }}
    >
    <table data-testid='project-table'>
      <thead>
        <tr data-testid='project-header-row'>
          {columnDef.map(m => <th data-testid='project-header' key={`${m.key}`}>{`${m.name}`}</th>)}
        </tr>
      </thead>
      <tbody>
        {rowData.map((rd, index) => <tr data-testid='project-data-row' key={`${index}`} onClick={onRowClick.bind(this, rd)} >
          {Object.values(rd).map((r, rId) => <td key={`${rId}`}>{`${r}`}</td>)}
        </tr>)}
      </tbody>
    </table>
    </div>
);
}