import React from 'react';

export default class SponsorshipForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.sponsorship ? props.sponsorship.title : '',
      type: props.sponsorship ? props.sponsorship.type : '',
      url: props.sponsorship ? props.sponsorship.url : '',
      body: props.sponsorship ? props.sponsorship.body : '',
      ready: props.sponsorship ? props.sponsorship.ready : '',
      error: ''
    };
  }
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
  onReadyChange = (e) => {
    const ready = e.target.value;
    this.setState(() => ({ ready }));
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.title) {
      this.setState(() => ({ error: 'Please provide sponsorship title.' }));
    }
    else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        title: this.state.title,
        type: this.state.type,
        url: this.state.url,
        body: this.state.body,
        ready: this.state.ready
      });
    }
  };
  // title
  // type
  // url
  // body
  // ready
  // issue
  // client

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Title"
          autoFocus
          className="text-input"
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <select
          value={this.state.type}
          onChange={this.onTypeChange}
        >
          <option value="sponsoredlink">Sponsored link</option>
          <option value="primarysponsorship">Primary Sponsorship</option>
        </select>
        <input
          type="url"
          placeholder="http://theweeklydrop.com"
          value={this.state.url}
          onChange={this.onUrlChange}
        />
        <textarea
          placeholder="Body copy"
          value={this.state.body}
          onChange={this.onBodyChange}
        >
        </textarea>
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              className="form-control"
              value={this.state.ready}
              onChange={this.onReadyChange}
            />
            Ready for publication
          </label>
        </div>
        <div>
          <button className="button">Save Sponsorship</button>
        </div>
      </form>
    );
  }
}
