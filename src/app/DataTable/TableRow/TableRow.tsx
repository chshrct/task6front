import React, { FC } from 'react';

type PersonType = {
  order: number;
  id: string;
  fullName: string;
  address: string;
  phone: string;
};

export const TableRow: FC<PersonType> = ({ order, address, fullName, id, phone }) => {
  return (
    <tr>
      <td className="align-middle text-center">{order}</td>
      <td className="align-middle text-center">{id}</td>
      <td className="align-middle text-center">{fullName}</td>
      <td className="align-middle text-center">{address}</td>
      <td className="align-middle text-center">{phone}</td>
    </tr>
  );
};
