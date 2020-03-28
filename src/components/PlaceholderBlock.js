import React from "react";
import PropTypes from "prop-types";

function PlaceholderBlock(props) {
  const { team, className, placeholderRows } = props;
  const rows = [];
  for (let i = 0; i < placeholderRows; i++) {
    rows.push(<div className="block__placeholder" key={i} />);
  }

  return (
    <div className={`block block--${className} `}>
      <h4 className={`block__heading block__heading--${team}`}> </h4>
      {rows}
    </div>
  );
}

PlaceholderBlock.propTypes = {
  team: PropTypes.string.isRequired,
  placeholderRows: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default PlaceholderBlock;
