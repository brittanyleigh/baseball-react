import React from "react";
import PropTypes from "prop-types";

class Block extends React.Component {
  render() {
    const { heading, children, className, team } = this.props;

    return (
      <div className={`block${className ? ` block--${className}` : ""}`}>
        <h4 className={`block__heading block__heading--${team}`}>{heading}</h4>
        {children}
      </div>
    );
  }
}

Block.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  className: PropTypes.string,
  team: PropTypes.string.isRequired
};

export default Block;
