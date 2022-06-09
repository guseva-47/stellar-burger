import PropTypes from 'prop-types';

const ingredientsTypePropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

export default ingredientsTypePropTypes;
