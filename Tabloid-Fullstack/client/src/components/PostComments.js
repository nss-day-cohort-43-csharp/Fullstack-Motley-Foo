import React from 'react';
import './PostComments.css';
import formatDate from '../utils/dateFormatter';

const PostComments = ({ postComments }) => {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center row">
        <div className="col-md-8">
          {postComments.map((comment) => (
            <div
              className="d-flex flex-column comment-section bg-light"
              key={comment.id}
            >
              <div className="bg-white p-2">
                <div className="d-flex flex-row user-info">
                  <div className="d-flex flex-column justify-content-start ml-2">
                    <span className="d-block font-weight-bold name">
                      {comment.userProfile.displayName}
                    </span>
                    <span className="date text-black-50">
                      Posted - {formatDate(comment.createDateTime)}{' '}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="comment-subject">{comment.subject}</p>
                </div>
                <div className="mt-2">
                  <p className="comment-text">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex flex-column comment-section">
            <div className="p-2">
              <div className="d-flex flex-row align-items-start">
                <textarea className="form-control ml-1 shadow-none textarea"></textarea>
              </div>
              <div className="mt-2 text-right">
                <button
                  className="btn btn-primary btn-sm shadow-none"
                  type="button"
                >
                  Post comment
                </button>
                <button
                  className="btn btn-outline-primary btn-sm ml-1 shadow-none"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComments;
