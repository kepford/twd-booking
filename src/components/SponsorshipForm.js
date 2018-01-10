import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import selectClients from '../selectors/clients';

class SponsorshipForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.sponsorship ? moment(props.sponsorship.date) : moment(),
      issue: props.sponsorship ? props.sponsorship.issue : '',
      client: props.sponsorship ? props.sponsorship.client : '',
      title: props.sponsorship ? props.sponsorship.title : '',
      type: props.sponsorship ? props.sponsorship.type : '',
      url: props.sponsorship ? props.sponsorship.url : '',
      body: props.sponsorship ? props.sponsorship.body : '',
      calendarFocused: false,
      status: props.sponsorship ? props.sponsorship.status : '',
      error: ''
    };
  }
  onIssueChange = (e) => {
    const issue = e.target.value;
    this.setState(() => ({ issue }));
  };
  onClientChange = (e) => {
    const client = e.target.value;
    this.setState(() => ({ client }));
  };
  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  onTypeChange = (e) => {
    const type = e.target.value;
    this.setState(() => ({ type }));
  };
  onUrlChange = (e) => {
    const url = e.target.value;
    this.setState(() => ({ url }));
  };
  onBodyChange = (e) => {
    const body = e.target.value;
    this.setState(() => ({ body }));
  };
  onDateChange = (date) => {
    if (date) {
      this.setState(() => ({ date }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onStatusChange = (e) => {
    const status = e.target.value;
    this.setState(() => ({ status }));
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.title) {
      this.setState(() => ({ error: 'Please provide sponsorship title.' }));
    }
    else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        date: this.state.date.valueOf(),
        issue: this.state.issue,
        type: this.state.type,
        client: this.state.client,
        title: this.state.title,
        url: this.state.url,
        body: this.state.body,
        status: this.state.status
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <div className="admin">
          <label>
            Date
          </label>
          <SingleDatePicker
            date={this.state.date}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <label>
            Issue
          </label>
          <input
            type="number"
            className="text-input"
            disabled
            value={this.state.issue}
            onChange={this.onIssueChange}
          />
          <label>
            Sponsorship Type
          </label>
          <select
            value={this.state.type}
            onChange={this.onTypeChange}
          >
            <option value="sponsoredlink">Sponsored link</option>
            <option value="primarysponsorship">Primary Sponsorship</option>
          </select>
          <label>
            Client
          </label>
          <select
            value={this.state.client}
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
        </div>
        <label>
          Title
        </label>
        <input
          type="text"
          placeholder="Title"
          maxlength="80"
          autoFocus
          className="text-input"
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <label>
          Title URL
        </label>
        <input
          type="url"
          placeholder="http://theweeklydrop.com"
          value={this.state.url}
          onChange={this.onUrlChange}
        />
        <label>
          Body Copy
        </label>
        <textarea
          placeholder="Body copy"
          maxlength="500"
          rows="5"
          value={this.state.body}
          onChange={this.onBodyChange}
        >
        </textarea>
        <label>
          Status
        </label>

        <select
          value={this.state.status}
          onChange={this.onStatusChange}
        >
          <option value="draft">Draft</option>
          <option value="Ready to publish">Ready to publish</option>
        </select>
        <div>
          <button className="button">Save Sponsorship</button>
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

export default connect(mapStateToProps)(SponsorshipForm);
