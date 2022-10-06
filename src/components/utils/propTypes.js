import PropTypes from 'prop-types';

export const PROP_INGREDIENTS = PropTypes.shape({
  "_id": PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
});

export const PROP_ORDER = PropTypes.shape({
  id: PropTypes.string.isRequired,
  text_status: PropTypes.string.isRequired,
  text_description: PropTypes.string.isRequired
});