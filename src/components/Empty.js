import React from "react";
import PropTypes from "prop-types";
import Block from "./Block";

function Empty(props) {
  const { heading, team, error, offDay } = props;
  let message;
  if (error) {
    message = (
      <h5>
        Oh no, something went wrong!<br></br>Check back later.
      </h5>
    );
  } else if (offDay) {
    message = <span className="message">Off Day!</span>;
  }

  return (
    <Block heading={heading} team={team}>
      <div className="block__item text--center block__item--flex">
        {message}
      </div>
    </Block>
  );
}

Empty.propTypes = {
  heading: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  error: PropTypes.bool,
  offDay: PropTypes.bool
};

export default Empty;
