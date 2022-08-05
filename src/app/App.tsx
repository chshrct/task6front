import { FC } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

import './App.css';
import { DataTable } from './DataTable/DataTable';
import { SetupForm } from './SetupForm/SetupForm';

import { useLazyGetPagesQuery } from 'store/api/appApi';

export const App: FC = () => {
  const [getPages, { data: pagesData, isFetching: isGetPagesFetching }] =
    useLazyGetPagesQuery();

  return (
    <Container className="d-flex flex-column align-items-center min-vh-100">
      <h1>Fake user data generator</h1>
      <SetupForm
        getPages={getPages}
        pagesData={pagesData}
        isGetPagesFetching={isGetPagesFetching}
      />
      <DataTable pagesData={pagesData} />
      <div style={{ height: '70px' }} />
    </Container>
  );
};
