import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

function Navbar(props) {
  const authLinks = (
    <ul>
      <li>
        <a onClick={() => props.dispatch(logout())} href="/">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">LogOut</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <a href="#!">Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!props.auth.loading && (
        <Fragment>
          {props.auth.isAuthenticated ? authLinks : guestLinks}
        </Fragment>
      )}
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Navbar);
