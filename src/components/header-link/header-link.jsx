import PropTypes from 'prop-types';
import { NavLink, useMatch } from 'react-router-dom';

import styles from './nav-link.module.css';

function HeaderLink({ Icon, text = '', to = '' }) {
  const isActive = useMatch(to);
  const getColor = isActive ? `${styles.link} ${styles.active}` : styles.link;
  const iconType = isActive ? 'primary' : 'secondary';
  return (
    <NavLink
      to={to}
      className={`pt-4 pl-5 pb-4 pr-5 text text_type_main-default ${getColor} ${styles.link}`}
    >
      <span className="pr-2">
        <Icon type={iconType} />
      </span>

      {text}
    </NavLink>
  );
}

HeaderLink.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  to: PropTypes.string,
  text: PropTypes.string.isRequired,
};

HeaderLink.defaultProps = {
  to: '',
};

export default HeaderLink;
