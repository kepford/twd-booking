import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import selectClients from '../selectors/clients';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class SponsorshipForm extends React.Component {
  constructor(props) {
    super(props);
    const content = props.sponsorship ? htmlToDraft(props.sponsorship.primaryBody) : '';
    const contentState = content ? ContentState.createFromBlockArray(content.contentBlocks) : '';
    this.state = {
      date: props.sponsorship ? moment(props.sponsorship.date) : moment(),
      issue: props.sponsorship ? props.sponsorship.issue : '',
      client: props.sponsorship ? props.sponsorship.client : '',
      title: props.sponsorship ? props.sponsorship.title : '',
      type: props.sponsorship ? props.sponsorship.type : '',
      url: props.sponsorship ? props.sponsorship.url : '',
      sponsoredLinkBody: props.sponsorship ? props.sponsorship.sponsoredLinkBody : '',
      primaryBody: props.sponsorship ? props.sponsorship.primaryBody : '',
      editorState: content ? EditorState.createWithContent(contentState) : EditorState.createEmpty(),
      calendarFocused: false,
      status: props.sponsorship ? props.sponsorship.status : '',
      error: ''
    };
  }

  onEditorStateChange: Function = (editorState) => {
    const primaryBody = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.setState({
      editorState,
      primaryBody
    });
  };
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
    const sponsoredLinkBody = e.target.value;
    this.setState(() => ({ sponsoredLinkBody }));
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
        type: this.state.type ? this.state.type : 'sponsored link',
        client: this.state.client,
        title: this.state.title,
        url: this.state.url,
        sponsoredLinkBody: this.state.sponsoredLinkBody,
        primaryBody: this.state.primaryBody,
        status: this.state.status ? this.state.status : 'draft',
      });
    }
  };

  render() {
    // Swap body depending on sponsorship type.
    let body = null;
    if (this.state.type === 'primary sponsorship') {
      body = <Editor
        editorState={this.state.editorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          options: ['link']
        }}
        onEditorStateChange={this.onEditorStateChange}
      />;
    }
    else {
      body = <textarea
        placeholder="Body copy"
        maxLength="500"
        rows="5"
        value={this.state.sponsoredLinkBody}
        onChange={this.onBodyChange}
      >
      </textarea>;
    }

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
            <option value="sponsored link">Sponsored link</option>
            <option value="primary sponsorship">Primary Sponsorship</option>
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
          maxLength="80"
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
        { body }
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
