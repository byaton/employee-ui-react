import React from 'react';
import { ProjectForm } from '../component/ProjectForm';
import { Project as ProjectInterface } from '../interfaces';

export const CreateProject: React.FC<{}> = (): JSX.Element => {
  const projectData: ProjectInterface = {
    id: 0,
    name: '',
    description: '',
    startDate: '1999-01-01',
    empIds: []
  }
  return (
    <div data-testid='project-form-test-id' >
      <ProjectForm Project={projectData} />
    </div>
  );
}