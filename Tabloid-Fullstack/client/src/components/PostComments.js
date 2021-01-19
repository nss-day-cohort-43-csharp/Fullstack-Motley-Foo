import React from 'react';
import './PostComments.css';

const PostComments = ({ postComments }) => {
  console.log(postComments);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="page-header">
            <h1>
              <small className="pull-right">
                {postComments.length} comments
              </small>{' '}
              Comments{' '}
            </h1>
          </div>
          <div className="comments-list">
            {/* This is where we will map over the post comments Array. */}
            {postComments.map((comment) => (
              <div className="media">
                <p className="pull-right">
                  <small>Posted: {comment.createDateTime}</small>
                </p>
                <a className="media-left" href="#">
                  <img src="http://lorempixel.com/40/40/people/1/" />
                </a>
                <div className="media-body">
                  <h4 className="media-heading user_name">
                    {comment.userProfileId}
                  </h4>
                  {comment.content}
                  <p>
                    <small>
                      <a href="">Like</a> - <a href="">Don't click me</a>
                    </small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComments;
