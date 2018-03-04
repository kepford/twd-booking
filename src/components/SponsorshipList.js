import React from 'react';
import { connect } from 'react-redux';
import SponsorshipListItem from './SponsorshipListItem';
import selectSponsorships from '../selectors/sponsorships';

export const SponsorshipList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <h1 className="page-header__title"> Sponsorship Content</h1>
      <div className="show-for-mobile">Sponsorships</div>
      <div className="show-for-desktop">Sponsorship</div>
    </div>
    <div className="list-body">
      {
        props.sponsorships.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No Sponsorships</span>
          </div>
        ) : (
          props.sponsorships.map((sponsorship) => {
            return <SponsorshipListItem key={sponsorship.id} {...sponsorship} />;
          })
        )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    sponsorships: selectSponsorships(state.sponsorships)
  };
};

export default connect(mapStateToProps)(SponsorshipList);
