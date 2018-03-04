import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const SponsorshipListItem = ({ id, issue, title, date, type, imageURL}) => (
  <Link className="list-item" to={`/edit/sponsorship/${id}`}>
    <div>
      <h3 className="list-item__title">{title} - Issue {issue}</h3>
      <span className="list-item__sub-title">{moment(date).format('MMMM Do, YYYY')}</span>
      <span className="list-item__sub-title">{type}</span>
      {
        imageURL && <img src={imageURL} />
      }
    </div>
  </Link>
);

export default SponsorshipListItem;
