import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './nav-link.module.css';

function NavLink({
  Icon, text = '', to = '', isActive = false,
}) {
  const getColor = isActive ? 'text_color_primary' : 'text_color_inactive';
  const iconType = isActive ? 'primary' : 'secondary';
  return (
    <Link
      to={to}
      className={`pt-4 pl-5 pb-4 pr-5 text text_type_main-default ${getColor} ${styles.link}`}
    >
      <span className="pr-2">
        <Icon type={iconType} />
      </span>

      {text}
    </Link>
  );
}

NavLink.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  to: PropTypes.string,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

NavLink.defaultProps = {
  to: '',
  isActive: false,
};

export default NavLink;
