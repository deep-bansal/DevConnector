import axios from "axios";
import { setAlert } from "./alert";

import {
  DELETE_ACCOUNT,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "./actiontypes";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/v1/profile/all");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    console.log("************", error);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getGithubRepos = (username) => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get(`/api/v1/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const res = await axios.post("/api/v1/profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"), "success");
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const res = await axios.put("/api/v1/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const res = await axios.put("/api/v1/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can Not be undone!")) {
    try {
      await axios.delete(`/api/v1/profile`);

      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: DELETE_ACCOUNT,
      });
      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (err) {
      console.log(err);
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
