import React from 'react';
import { connect } from 'react-redux';
import ClientForm from './ClientForm';
import { startAddClient } from '../actions/clients';

export class AddClientPage extends React.Component {
  onSubmit = (client) => {
    this.props.startAddClient(client);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Client</h1>
          </div>
        </div>
        <div className="content-container">
          <ClientForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddClient: (client) => dispatch(startAddClient(client))
});

export default connect(undefined, mapDispatchToProps)(AddClientPage);
