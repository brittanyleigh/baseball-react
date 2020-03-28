import React from "react";
import PropTypes from "prop-types";

function Block(props) {
  const { heading, children, className, team } = props;

  return (
    <div className={`block${className ? ` block--${className}` : ""}`}>
      <h4 className={`block__heading block__heading--${team}`}>{heading}</h4>
      {children}
    </div>
  );
}

Block.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  className: PropTypes.string,
  team: PropTypes.string.isRequired
};

export default Block;
