import React from 'react';
import { connect } from 'react-redux';
import UserListItem from './UserListItem';
import selectUsers from '../selectors/users';
import selectClients from '../selectors/clients';

export const UserList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div>Users</div>
    </div>
    <div className="list-body">
      {
        props.users.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No users</span>
          </div>
        ) : (
          props.users.map((user, i) => {
            let client= props.clients.find((client) => client.id === user.clientId);
            user.clientName = client.clientName;
            return <UserListItem key={i} {...user} />;
          })
        )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    users: selectUsers(state.users, state.filters),
    clients: selectClients(state.clients, state.filters)
  };
};

export default connect(mapStateToProps)(UserList);
