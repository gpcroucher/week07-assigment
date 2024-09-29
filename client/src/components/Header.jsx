import NavBar from "./NavBar";
import PropTypes from "prop-types";

import "./Header.css";

export default function Header(props) {
  return (
    <div className="header">
      <h1>Petbook</h1>
      <NavBar exclude={props.exclude} />
    </div>
  );
}

Header.propTypes = {
  exclude: PropTypes.arrayOf(PropTypes.string),
};
