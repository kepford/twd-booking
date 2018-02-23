import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import selectClients from '../selectors/clients';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class SponsorshipForm extends React.Component {
  constructor(props) {
    super(props);
    const content = props.sponsorship ? htmlToDraft(props.sponsorship.primaryBody) : '';
    const contentState = content ? ContentState.createFromBlockArray(content.contentBlocks) : '';
    this.state = {
      isAdmin: props.isAdmin,
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
      image: props.sponsorship ? props.sponsorship.image : '',
      isUploading: false,
      progress: 0,
      imageURL: props.sponsorship ? props.sponsorship.imageURL : '',
      error: ''
    };
  }

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }

  handleUploadSuccess = (filename) => {
    this.setState({
      image: filename,
      progress: 100,
      isUploading: false
    });
    firebase.storage().ref('images').child(filename)
      .getDownloadURL().then(url => this.setState({imageURL: url}));
  };
  handleDeleteImage = (e) => {
    e.preventDefault();
    this.setState({
      image: null,
      imageURL: null
    });
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const image = storageRef.child('images/' + this.state.image);
    image.delete().then(function() {
      console.log('file was deleted');
    }).catch(function(error) {
      console.error(error);
    });
  };
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
        type: this.state.type || 'sponsored link',
        client: this.state.client,
        title: this.state.title,
        url: this.state.url,
        sponsoredLinkBody: this.state.sponsoredLinkBody,
        primaryBody: this.state.primaryBody,
        imageURL: this.state.imageURL || '',
        image: this.state.image || '',
        status: this.state.status || 'draft',
      });
    }
  };

  render() {
    // Swap body depending on sponsorship type.
    let admin = null;
    let body = null;
    let image = null;
    if (this.state.isAdmin) {
      admin = <div className="admin">
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
      </div>;
    }
    else {
      admin = <div className="admin">
        <div>Date:   { moment(this.state.date).format('MMMM Do, YYYY') } </div>
        <div>Type:   { this.state.type } </div>
        <div>Issue:  { this.state.issue } </div>
      </div>;
    }
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
      image = <div>
        <label>Image:</label>
        { this.state.isUploading &&
          <p>Progress: {this.state.progress}</p>
        }
        { this.state.imageURL &&
          <div>
            <img src={this.state.imageURL} />
            <button className="button button--secondary" onClick={this.handleDeleteImage}>Remove Image</button>
          </div>
        }
        <FileUploader
          accept="image/*"
          name="image"
          randomizeFilename
          storageRef={firebase.storage().ref('images')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
          maxHeight="125"
          maxWidth="125"
        />
        <div className="field-instructions">Images must be 125px by 125px. Images are automatically resized
          to these dimensions.</div>
      </div>;
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
        { admin }
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
        { image }
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
    isAdmin: state.user.isAdmin,
    clients: selectClients(state.clients, state.filters)
  };
};

export default connect(mapStateToProps)(SponsorshipForm);
