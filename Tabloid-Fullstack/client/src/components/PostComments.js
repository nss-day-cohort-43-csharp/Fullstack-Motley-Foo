import React, { useContext, useEffect, useState } from 'react';
import './PostComments.css';
import formatDate from '../utils/dateFormatter';
import { useParams } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';

const PostComments = ({ postComments }) => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const { postId } = useParams();
  const [commentSubject, setCommentSubject] = useState('');
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    console.log('This is the commentSubject state', commentSubject);
    console.log('This is the commentContent state', commentContent);
  }, [commentSubject, commentContent]);

  const saveNewComment = () => {
    const currentUser = getCurrentUser();
    const commentToAdd = {
      postId: postId,
      userProfileId: currentUser.id,
      subject: commentSubject,
      content: commentContent,
    };
    console.log(commentToAdd);
  };

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
                <textarea
                  value={commentSubject}
                  placeholder="Comment Subject"
                  className="form-control ml-2 shadow-none border textarea"
                  onChange={(e) => setCommentSubject(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex flex-row align-items-start">
                <textarea
                  value={commentContent}
                  placeholder="Comment Content"
                  className="form-control ml-2 shadow-none border textarea"
                  onChange={(e) => setCommentContent(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-2 text-right">
                <button
                  className="btn btn-primary btn-sm shadow-none"
                  type="button"
                  onClick={saveNewComment}
                >
                  Post comment
                </button>
                <button
                  className="btn btn-outline-primary btn-sm ml-1 shadow-none"
                  type="button"
                  onClick={(click) => {
                    setCommentContent('');
                    setCommentSubject('');
                  }}
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
