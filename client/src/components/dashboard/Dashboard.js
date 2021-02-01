import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { Link } from "react-router-dom";

function Dashboard(props) {
  const {
    auth: { user },
    profile: { profile, loading },
    dispatch,
  } = props;
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  return loading && profile === null ? (
    <Fragment>Loading...</Fragment>
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile,please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    profile: state.profile,
  };
}
export default connect(mapStateToProps)(Dashboard);
