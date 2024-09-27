import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar(props) {
  const pages = [
    { name: "Home", link: "/" },
    { name: "Upload", link: "/add" },
    { name: "View", link: "/view" },
  ];

  return (
    <nav className="navbar-container">
      {pages.map((page) => {
        if (!props.exclude.includes(page.link)) {
          return (
            <Link className="navbar-link" key={page.link} to={page.link}>
              {page.name}
            </Link>
          );
        }
      })}
    </nav>
  );
}

NavBar.propTypes = {
  exclude: PropTypes.arrayOf(PropTypes.string),
};
