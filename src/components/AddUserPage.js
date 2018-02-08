import React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import { startAddUser } from '../actions/users';

export class AddUserPage extends React.Component {
  onSubmit = (user) => {
    this.props.startAddUser(user);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add User</h1>
          </div>
        </div>
        <div className="content-container">
          <UserForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddUser: (user) => dispatch(startAddUser(user))
});

export default connect(undefined, mapDispatchToProps)(AddUserPage);
