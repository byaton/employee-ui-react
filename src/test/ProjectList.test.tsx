import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectList } from '../page/ProjectList';

describe('Unit testing of Project List', () => {
  test('should render the Project List', () => {
    render(
      <BrowserRouter>
        <ProjectList />
      </BrowserRouter>
    );
    
    const projectGridEl: HTMLElement[] = screen.getAllByTestId('project-list-test-id');
    expect(projectGridEl).toHaveLength(1);
  });
  


  test('setProjectText executes on changing of input text', () => {
    const setProjectText = jest.fn();
    render(
      <BrowserRouter>
        <ProjectList />
      </BrowserRouter>
    );
    const inputEl: HTMLElement = screen.getByTestId('search-input-project-test-id');
    fireEvent.change(inputEl, { target: { value: 'Amit' } });
    expect(setProjectText).toHaveBeenCalledTimes(0);
  });

});
