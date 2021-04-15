import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { deleteAccount } from "../../actions/profile";

function Dashboard(props) {
  const {
    auth: { user },
    profile: { profile, loading },
    dispatch,
  } = props;
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return loading && profile === null ? (
    <Fragment>Loading...</Fragment>
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          {profile.experience !== undefined ? (
            <Experience experience={profile.experience} />
          ) : (
            ""
          )}
          {profile.education !== undefined ? (
            <Education education={profile.education} />
          ) : (
            ""
          )}
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(deleteAccount());
              }}
            >
              <i className="fas fa-user-minus"></i> Delete Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile,please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(deleteAccount());
              }}
            >
              <i className="fas fa-user-minus"></i> Delete Account
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  // deleteAccount: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    profile: state.profile,
  };
}
export default connect(mapStateToProps)(Dashboard);
