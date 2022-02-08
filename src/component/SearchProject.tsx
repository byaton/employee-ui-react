import React, { Fragment, useState } from 'react';

export interface IProps {
    setProjectSearchText: (projectSearchText: string) => void
}

export const SearchProject: React.FC<IProps> = (props: React.PropsWithChildren<IProps>): JSX.Element => {
    const [searchProjText, setSerachProjText] = useState<string>('');

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = 
        (e: React.ChangeEvent<HTMLInputElement>)  => {
        setSerachProjText(e.target.value);
        props.setProjectSearchText(e.target.value);
    }

    return (
        <Fragment>
            <input data-testid='search-input-project-test-id' type='text' onChange={onChangeHandler.bind(this)} value={searchProjText} />
        </Fragment>
    );
}