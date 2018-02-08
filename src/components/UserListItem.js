import React from 'react';
import { Link } from 'react-router-dom';

const UserListItem = ({ id, userDisplayName, clientId }) => (
  <Link className="list-item" to={`/edit/user/${id}`}>
    <div>
      <h3 className="list-item__title">{userDisplayName}</h3>
      <h3>{clientId}</h3>
    </div>
  </Link>
);

export default UserListItem;
