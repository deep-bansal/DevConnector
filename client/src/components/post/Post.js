import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import CommentFrom from "./CommentFrom";
import CommentItem from "./CommentItem";

function Post({ getPost, post: { post, loading }, match }) {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentFrom postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
}

function mapStateToProps(state) {
  return {
    post: state.post,
  };
}
export default connect(mapStateToProps, { getPost })(Post);
