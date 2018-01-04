import React from 'react';
import { connect } from 'react-redux';
import SponsorshipForm from './SponsorshipForm';
import { startAddSponsorship } from '../actions/sponsorships';

export class AddSponsorshipPage extends React.Component {
  onSubmit = (sponsorship) => {
    this.props.startAddSponsorship(sponsorship);
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add sponsorship</h1>
          </div>
        </div>
        <div className="content-container">
          <SponsorshipForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddSponsorship: (sponsorship) => dispatch(startAddSponsorship(sponsorship))
});

export default connect(undefined, mapDispatchToProps)(AddSponsorshipPage);
