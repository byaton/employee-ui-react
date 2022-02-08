import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { 
  Project as ProjectInterface, 
  Employee as EmployeeInterface } from '../interfaces';
import  { saveProject, getProjects, getEmployees } from '../util/apiCalls';

export interface IProps {
  Project: ProjectInterface
}

export const ProjectForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [projectId, setProjectId] = useState<number>(0);  
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [projStartDate, setProjStartDate] = useState<string>('');
  const [empIds, setEmpIds] = useState<string[]>([]);
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (!!location.state) {
      const locProject: ProjectInterface = location.state as ProjectInterface;
    
      setProjectId(locProject.id);
      setProjectName(locProject.name);
      setProjectDescription(locProject.description);
      setProjStartDate(locProject.startDate);
      setEmpIds(locProject.empIds.map(m => m.toString()));
    } else {
      getProjectsFromServer();
    }

    // const localEmployeeData: EmployeeInterface[] = [
    //   {id: 1, name: 'Amit1'},
    //   {id: 2, name: 'Amit2'},
    //   {id: 3, name: 'Amit3'}
    // ];

    // setEmployees(localEmployeeData);
    
    const getEmployeesFromServer = async (): Promise<void> => {
      const serverEmployeeData: EmployeeInterface[] = await getEmployees();
      setEmployees(serverEmployeeData);
    }

    getEmployeesFromServer();
  
  }, [])

  

  const projNameChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  } 

  const projDescChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectDescription(e.target.value);
  }

  const projStartDateChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjStartDate(e.target.value);
  }

  const changeSelectionHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selEmployees: number[] = [];
    Object.values(e.target.options).forEach(f => 
      f.selected && selEmployees.push(parseInt(f.value)));
    setEmpIds(selEmployees.map(m => m.toString()));
  }

  const projectSubmitHandler = async () => {
    const project: ProjectInterface = {
      id: projectId,
      name: projectName,
      description: projectDescription,
      startDate: projStartDate.toString(),
      empIds: empIds.map(m => parseInt(m))
    };

    const saveProjectToServer = async (): Promise<void> => {
      const statusCode: number =  await saveProject(project);
      if (statusCode === 200) {
        getProjectsFromServer();
      }
    }

    saveProjectToServer();

    // const statusCode: number =  await saveProject(project);
    // if (statusCode === 200) {
    //   getProjectsFromServer();
    // }

  }

  const getProjectsFromServer = async (): Promise<void> => {
    const serverProjectData: ProjectInterface[] = await getProjects();
    if (serverProjectData.length === 0) {
      setProjectId(1);
    } else {
      const maxProjectId = Math.max(...serverProjectData.map(m => m.id));
      setProjectId(maxProjectId + 1);
    }
    
  }

  


  const getButtonText = (): string => !!location.state ? 'update' : 'save';

  const getDisableStatus = (): boolean => !projectName || 
    !projectDescription || 
    !projStartDate || 
    !empIds.length;

  return (
    <div className='all-values'>
      <div className='label-buttons'>
        <div data-testid="project-levels" className='label-headers'>
          <label>Project ID</label>
          <label>Project Name</label>
          <label>Project Description</label>
          <label>Project Start Date</label>
          <label>Employee IDs</label>
        </div>
        <div data-testid='project-values' className='label-values'>
          <span>{ projectId }</span>
          <input data-testid='project-name' type="text" value={projectName} onChange={projNameChangeHandler.bind(this)}/>
          <input data-testid='project-desc' type="text" value={projectDescription} onChange={projDescChangeHandler.bind(this)} />
          <input data-testid='project-start-date' type="date" value={ projStartDate.toString() } onChange={projStartDateChangeHandler.bind(this)} />
          <select 
            multiple={true} 
            onChange={changeSelectionHandler.bind(this)}
            value={empIds}
            data-testid='project-emp-Select'
          >
            {employees.map((m, index) => {
              return <option data-testid='emp-detail' key={index} value={m.id}>{m.name}</option>
            })}
          </select>
        </div>
        
      </div>
      <input data-testid='project-submit' className='submit-button' type='button' disabled={getDisableStatus()} value={getButtonText()} onClick={projectSubmitHandler.bind(this)}/>
      
    </div>
  );
}