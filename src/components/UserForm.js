import React from 'react';
import { connect } from 'react-redux';
import selectClients from '../selectors/clients';

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userUid: props.user ? props.user.userUid : '',
      clientId: props.user ? props.user.clientId : '',
      userDisplayName: props.user ? props.user.userDisplayName : '',
      error: ''
    };
  }

  onUserUidChange = (e) => {
    const userUid = e.target.value;
    this.setState(() => ({ userUid }));
  };

  onUserDisplayNameChange = (e) => {
    const userDisplayName = e.target.value;
    this.setState(() => ({ userDisplayName }));
  };

  onClientChange = (e) => {
    const clientId = e.target.value;
    this.setState(() => ({ clientId }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.userUid) {
      this.setState(() => ({ error: 'Please provide user UID.' }));
    }
    else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        userUid: this.state.userUid,
        userDisplayName: this.state.userDisplayName,
        clientId: this.state.clientId
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}

        <label>
          User Display Name
        </label>
        <input
          type="text"
          placeholder="User display Name"
          autoFocus
          className="text-input"
          value={this.state.userDisplayName}
          onChange={this.onUserDisplayNameChange}
        />
        <label>
          User UID
        </label>
        <input
          type="text"
          placeholder="User UID"
          autoFocus
          className="text-input"
          value={this.state.userUid}
          onChange={this.onUserUidChange}
        />
        <label>
          Client
        </label>
        <select
          value={this.state.clientId}
          onChange={this.onClientChange}
        >
          {
            this.props.clients.map((client) => <option
              value={client.id}
              key={client.id}
            >
              {client.clientName}
            </option>
            )
          }
        </select>
        <div>
          <button className="button">Save User</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clients: selectClients(state.clients, state.filters)
  };
};

export default connect(mapStateToProps)(UserForm);
