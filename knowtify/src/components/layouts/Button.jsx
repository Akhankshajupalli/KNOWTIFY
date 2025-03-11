import PropTypes from 'prop-types';

const Button = ({ children, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {children} {/* ✅ This will now display the text between the tags */}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired, // ✅ Use children instead of label
  onClick: PropTypes.func.isRequired,
};

export default Button;
