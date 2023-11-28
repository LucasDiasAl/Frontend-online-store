import React from 'react';
import PropTypes from 'prop-types';

import './reviewTable.css';

class ReviewTable extends React.Component {
  render() {
    const { avaliaçoes } = this.props;
    return (
      <div className="review__div">
        <ul className="reviews__list">
          {
            avaliaçoes.map(({ email: userEmail, text, rating }, index) => (
              <li key={ index } className="reviews">
                <h3 className="review__card__email">
                  {userEmail}
                </h3>
                <h3 className="review__card__rating">
                  {rating}
                </h3>
                <h3 className="review__card__evaluation">
                  {text}
                </h3>
              </li>))
          }
        </ul>
      </div>
    );
  }
}

ReviewTable.propTypes = {
  avaliaçoes: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default ReviewTable;
