import React, { useContext, useEffect, useState } from 'react';
import './PostComments.css';
import formatDate from '../utils/dateFormatter';
import { useParams } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { toast } from 'react-toastify';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const PostComments = () => {
  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [commentSubjectForDelete, setCommentSubjectForDelete] = useState('');
  const [commentSubject, setCommentSubject] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [pendingDelete, setPendingDelete] = useState(false);
  const [commentIdForDelete, setCommentIdForDelete] = useState(0);
  const activeUser = getCurrentUser();

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

  const deleteComment = (commentId) => {
    getToken().then((token) => {
      fetch(`../api/comment/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        getComments();
      });
    });
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
                {/* You are currently working on how to get this to render more pretty and then capture the right comment id to make the api delete request */}
                {getCurrentUser().id === comment.userProfileId ? (
                  <Button
                    onClick={() => {
                      setCommentSubjectForDelete(comment.subject);
                      setPendingDelete(true);
                      setCommentIdForDelete(comment.id);
                    }}
                  >
                    {' '}
                    Delete{' '}
                  </Button>
                ) : null}
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
      <Modal isOpen={pendingDelete}>
        <ModalHeader>
          Delete this comment {commentSubjectForDelete}?
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete this comment? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
          <Button
            className="btn btn-outline-danger"
            onClick={(e) => {
              setPendingDelete(false);
              deleteComment(commentIdForDelete);
            }}
          >
            Yes, Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PostComments;
