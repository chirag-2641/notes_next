import React, { useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import themeContext from "../context/themes/themeContext";

const Navbar = (props) => {
  let location = useLocation();
  let history = useHistory();
  const contextForThemes = useContext(themeContext);
  const { theme, setTheme } = contextForThemes;

  const handleLogout = () => {
    localStorage.removeItem("token");
    props.showAlert("Logged Out succesfully! ", "info");
    history.push("/login");
  };

  const handleClick1 = () => {
    setTheme({ light: true, dark: false, anotherDark: false, darkTeal: false, rainbow:false });
    //console.log("theme selected =  "+theme)
  };

  const handleClick2 = () => {
    setTheme({ light: false, dark: true, anotherDark: false, darkTeal: false, rainbow:false });
    //console.log("theme selected =  "+theme)
  };

  const handleClick3 = () => {
    setTheme({ light: false, dark: false, anotherDark: true, darkTeal: false, rainbow:false });
    //console.log("theme selected =  "+theme)
  };

  const handleClick4 = () => {
    setTheme({ light: false, dark: false, anotherDark: false, darkTeal: true, rainbow:false });
  };

  const handleClick5 = () => {
    setTheme({ light: false, dark: false, anotherDark: false, darkTeal: false, rainbow:true });
  };

  let navbarStyle = {
    backgroundColor: "#212529",
  };
  let buttonStyle = {
    backgroundColor: "blue",
    color:'white'
  }
  if(theme.dark) {
    buttonStyle = {
      backgroundColor:'#0b0b6fdb',
      color:'white'
    }
  }
  else if(theme.anotherDark) {
    buttonStyle = {
      backgroundColor:'#00C548',
      color:'black'
    }
  }
  else if (theme.darkTeal) {
    navbarStyle = {
      backgroundColor: "#02393e",
    };
    buttonStyle = {
      backgroundColor:'#4F8AA7',
      color:'white'
    }
  }
  else if (theme.rainbow) {
    buttonStyle = {
      background:"linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)",
      color:"black"
    }
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-custom"
      style={navbarStyle}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="/#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Themes
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <button className="dropdown-item" onClick={handleClick1}>
                    Light
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleClick2}>
                    Dark
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleClick3}>
                    High Contrast
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleClick4}>
                    Dark Teal
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleClick5}>
                    Rainbow
                  </button>
                </li>
              </ul>
            </li>
          </ul>

          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">
                SignUp
              </Link>
            </form>
          ) : (
            <button className={`btn btn-custom mx-2`} style={buttonStyle} onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
