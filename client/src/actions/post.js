import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./actiontypes";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/post/all");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/post/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/post/like/${id}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/post/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/post/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("Post Removed", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addPost = (formBody) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/v1/post`, formBody, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post Added", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addComment = (postId, formBody) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/v1/post/comment/${postId}`,
      formBody,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/post/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment Removed", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
