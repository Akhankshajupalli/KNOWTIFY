// src/components/layouts/Button.jsx
import PropTypes from 'prop-types';

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button className={`custom-button ${className}`} onClick={onClick} type={type}>
      {children} {/* ✅ Displays the text or component between the tags */}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired, // ✅ Use children instead of label
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string, // ✅ Optional type prop (default to "button")
  className: PropTypes.string, // ✅ Optional className prop
};

export default Button;
