import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchProject, IProps } from '../component/SearchProject';

describe('Unit testing of Search Project', () => {
  test('should call the props method on entering the input text', () => {
    const setProjectSearchText = jest.fn();
    const props:IProps = {
      setProjectSearchText: setProjectSearchText
    };

    render(
      <BrowserRouter>
        <SearchProject {...props} />
      </BrowserRouter>
    );

    const inputEl: HTMLElement = screen.getByTestId('search-input-project-test-id');

    fireEvent.change(inputEl, { target: { value: 'Amit' } });
    expect(setProjectSearchText).toBeCalledTimes(1);

  });
  
});
