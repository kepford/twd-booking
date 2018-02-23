import React from 'react';
import { connect } from 'react-redux';
import SponsorshipForm from './SponsorshipForm';
import { startEditSponsorship, startRemoveSponsorship } from '../actions/sponsorships';

export class EditSponsorshipPage extends React.Component {
  onSubmit = (sponsorship) => {
    this.props.startEditSponsorship(this.props.sponsorship.id, sponsorship);
    this.props.history.push('/dashboard');
  };
  onRemove = () => {
    this.props.startRemoveSponsorship({ id: this.props.sponsorship.id });
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit sponsorship</h1>
          </div>
        </div>
        <div className="content-container">
          <SponsorshipForm
            sponsorship={this.props.sponsorship}
            onSubmit={this.onSubmit}
          />
          {
            this.props.isAdmin && <button className="button button--secondary" onClick={this.onRemove}>Remove sponsorship</button>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isAdmin: state.user.isAdmin,
  sponsorship: state.sponsorships.find((sponsorship) => sponsorship.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  startEditSponsorship: (id, sponsorship) => dispatch(startEditSponsorship(id, sponsorship)),
  startRemoveSponsorship: (data) => dispatch(startRemoveSponsorship(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSponsorshipPage);
