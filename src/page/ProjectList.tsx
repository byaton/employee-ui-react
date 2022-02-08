import React, { useState } from 'react';
import { ProjectGrid } from '../component/ProjectGrid';
import { SearchProject } from '../component/SearchProject';

export const ProjectList: React.FC<{}> = (): JSX.Element => {
  const [searchProjText, setSearchProjText] = useState<string>('');

  const setProjectText = (searchText: string): void => {
    setSearchProjText(searchText);
  }

  return (
    <div data-testid='project-list-test-id'>
      <SearchProject setProjectSearchText={setProjectText} />
      <ProjectGrid projectSearchText={ searchProjText } />
    </div>
  );
}