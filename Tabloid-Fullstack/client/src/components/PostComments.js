import React, { useContext, useEffect, useState } from 'react';
import './PostComments.css';
import formatDate from '../utils/dateFormatter';
import { useParams } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { toast } from 'react-toastify';

const PostComments = () => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [commentSubject, setCommentSubject] = useState('');
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    fetch(`/api/comment/${postId}`)
      .then((res) => {
        if (res.status === 404) {
          toast.error('Oops something went wrong with comment api');
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data != undefined) {
          setComments(data);
        }
      });
  };

  const saveNewComment = () => {
    const commentToAdd = {
      postId: postId,
      subject: commentSubject,
      content: commentContent,
    };
    console.log(commentToAdd);
    getToken().then((token) =>
      fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentToAdd),
      }).then(() => {
        setCommentSubject('');
        setCommentContent('');
        getComments();
      })
    );
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center row">
        <div className="col-md-8">
          {comments.map((comment) => (
            <div
              className="d-flex flex-column comment-section my-1 bg-light"
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
                <div className="mt-1">
                  <p className="comment-subject">{comment.subject}</p>
                </div>
                <div className="mt-1">
                  <p className="comment-text">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex flex-column comment-section">
            <div className="p-2">
              <div
                className="d-flex align-items-start"
                style={{ height: '47px' }}
              >
                <textarea
                  value={commentSubject}
                  placeholder="Comment Subject"
                  className="form-control ml-2 mb-1 shadow-none border textarea subject-text-field"
                  onChange={(e) => setCommentSubject(e.target.value)}
                  style={{ height: '47px' }}
                ></textarea>
              </div>
              <div className="d-flex flex-row align-items-start">
                <textarea
                  value={commentContent}
                  placeholder="Comment Content"
                  className="form-control ml-2 mt-1 shadow-none border textarea"
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
