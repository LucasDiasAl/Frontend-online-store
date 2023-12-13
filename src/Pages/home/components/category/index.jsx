import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './category.css';

class Category extends Component {
  render() {
    const { handleCategory, categorias } = this.props;
    return (
      <div className="categories">
        {
          categorias.map(({ id, name }) => (
            <div key={ id }>
              <input
                type="radio"
                id={ name }
                value={ id }
                name="category"
                onClick={ handleCategory }
                className="radio__input"
              />
              <label
                htmlFor={ name }
              >
                { name }
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}

Category.propTypes = {
  handleCategory: PropTypes.func.isRequired,
  categorias: PropTypes.arrayOf(Object).isRequired,
};

export default Category;
