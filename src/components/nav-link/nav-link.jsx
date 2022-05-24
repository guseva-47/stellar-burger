import PropTypes from 'prop-types';

import styles from './nav-link.module.css';

function NavLink({
  Icon, text = '', ref = '', isActive = false,
}) {
  const getColor = isActive ? 'text_color_primary' : 'text_color_inactive';
  const iconType = isActive ? 'primary' : 'secondary';
  return (
    <a
      href={ref}
      className={`pt-4 pl-5 pb-4 pr-5 text text_type_main-default ${getColor} ${styles.link}`}
    >
      <span className="pr-2">
        <Icon type={iconType} />
      </span>

      {text}
    </a>
  );
}

NavLink.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  ref: PropTypes.string,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

NavLink.defaultProps = {
  ref: '',
  isActive: false,
};

export default NavLink;
