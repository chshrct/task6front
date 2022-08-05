import { FC } from 'react';

import { Table } from 'react-bootstrap';

import { TableRow } from 'app/DataTable/TableRow/TableRow';
import { getPagesResponseType } from 'store/api/types';

type PropsType = {
  pagesData: getPagesResponseType | undefined;
};

export const DataTable: FC<PropsType> = ({ pagesData }) => {
  return (
    <div className="w-100 mt-3">
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th className="align-middle text-center">#</th>
            <th className="align-middle text-center">Id</th>
            <th className="align-middle text-center">Full name</th>
            <th className="align-middle text-center">Address</th>
            <th className="align-middle text-center">Phone number</th>
          </tr>
        </thead>
        <tbody>
          {pagesData?.map(({ id, order, fullName, address, phone }) => (
            <TableRow
              key={id}
              order={order}
              id={id}
              fullName={fullName}
              address={address}
              phone={phone}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
