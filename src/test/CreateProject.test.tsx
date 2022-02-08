import React from 'react';
import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import { CreateProject } from '../page/CreateProject';

describe('Unit testing of Create Project', () => {
  test('should render create Project Page', () => {
    render(
      <BrowserRouter>
        <CreateProject />
      </BrowserRouter>
    );
    
    const projectFormEl: HTMLElement[] = screen.getAllByTestId('project-form-test-id');
    expect(projectFormEl).toHaveLength(1);
  });
  
});
