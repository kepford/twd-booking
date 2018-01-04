import React from 'react';
import { connect } from 'react-redux';
import ClientForm from './ClientForm';
import { startEditClient, startRemoveClient } from '../actions/clients';

export class EditClientPage extends React.Component {
  onSubmit = (client) => {
    this.props.startEditClient(this.props.client.id, client);
    this.props.history.push('/clients');
  };
  onRemove = () => {
    this.props.startRemoveClient({ id: this.props.client.id });
    this.props.history.push('/clients');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Client</h1>
          </div>
        </div>
        <div className="content-container">
          <ClientForm
            client={this.props.client}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemove}>Remove Client</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  client: state.clients.find((client) => client.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditClient: (id, client) => dispatch(startEditClient(id, client)),
  startRemoveClient: (data) => dispatch(startRemoveClient(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditClientPage);
