import React from "react";
import PropTypes from "prop-types";
import Block from "./Block";

function Error(props) {
  const { heading, team } = props;

  return (
    <Block heading={heading} team={team}>
      <div className="block__item text--center">
        <h5>
          Oh no, something went wrong!<br></br>Check back later.
        </h5>
      </div>
    </Block>
  );
}

Error.propTypes = {
  heading: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired
};

export default Error;
