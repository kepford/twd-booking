import React from 'react';
import { Link } from 'react-router-dom';

const SponsorshipListItem = ({ id, title }) => (
  <Link className="list-item" to={`/edit/sponsorship/${id}`}>
    <div>
      <h3 className="list-item__title">{title}</h3>
    </div>
  </Link>
);

export default SponsorshipListItem;
