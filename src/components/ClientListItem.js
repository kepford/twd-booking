import React from 'react';
import { Link } from 'react-router-dom';

const ClientListItem = ({ id, clientName }) => (
  <Link className="list-item" to={`/edit/client/${id}`}>
    <div>
      <h3 className="list-item__title">{clientName}</h3>
    </div>
  </Link>
);

export default ClientListItem;
