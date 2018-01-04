import React from 'react';

export default class ClientForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clientName: props.client ? props.client.clientName : '',
      error: ''
    };
  }
  onClientNameChange = (e) => {
    const clientName = e.target.value;
    this.setState(() => ({ clientName }));
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.clientName) {
      this.setState(() => ({ error: 'Please provide client name.' }));
    }
    else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        clientName: this.state.clientName
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Client name"
          autoFocus
          className="text-input"
          value={this.state.clientName}
          onChange={this.onClientNameChange}
        />
        <div>
          <button className="button">Save Client</button>
        </div>
      </form>
    );
  }
}
