import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import PropTypes from "prop-types";
import moment from "moment";

import { getDivisionStandings } from "../ducks/standings";
import { getHitterStats } from "../ducks/hitterStats";
import { getPitcherStats } from "../ducks/pitcherStats";

function YearHeading(props) {
  const { team } = props;
  const dispatch = useDispatch();
  const currentYear = moment().format("YYYY");
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    dispatch(getDivisionStandings(year));
    dispatch(getHitterStats(year));
    dispatch(getPitcherStats(year));
  }, [year, team, dispatch]);

  const options = [
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
    { value: "2018", label: "2018" },
    { value: "2017", label: "2017" },
    { value: "2016", label: "2016" },
    { value: "2015", label: "2015" },
    { value: "2014", label: "2014" },
    { value: "2013", label: "2013" },
    { value: "2012", label: "2012" },
    { value: "2011", label: "2011" },
    { value: "2010", label: "2010" },
    { value: "2009", label: "2009" },
    { value: "2008", label: "2008" },
    { value: "2007", label: "2007" },
    { value: "2006", label: "2006" },
    { value: "2005", label: "2005" },
    { value: "2004", label: "2004" },
    { value: "2003", label: "2003" },
    { value: "2002", label: "2002" },
    { value: "2001", label: "2001" },
    { value: "2000", label: "2000" }
  ];

  return (
    <div className="section-heading">
      <h2 className="section-heading--inline-block">Stats</h2>{" "}
      <Select
        className="section-heading__select"
        options={options}
        defaultValue={{ label: currentYear, value: currentYear }}
        onChange={e => {
          setYear(e.value);
        }}
      />
    </div>
  );
}

YearHeading.propTypes = {
  team: PropTypes.object.isRequired
};

export default YearHeading;
