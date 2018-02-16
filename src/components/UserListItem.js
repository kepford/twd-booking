import React from 'react';
import { Link } from 'react-router-dom';

const UserListItem = ({ id, userDisplayName, clientName}) => (
  <Link className="list-item" to={`/edit/user/${id}`}>
    <div>
      <h3 className="list-item__title">{userDisplayName}</h3>
      <div>{clientName}</div>
    </div>
  </Link>
);

export default UserListItem;
