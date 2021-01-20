import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Jumbotron } from 'reactstrap';
import PostComments from '../components/PostComments';
import PostReactions from '../components/PostReactions';
import formatDate from '../utils/dateFormatter';
import './PostDetails.css';
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useHistory } from "react-router-dom";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [reactionCounts, setReactionCounts] = useState([]);
  const [comments, setComments] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const history = useHistory();

  useEffect(() => {
    fetch(`/api/post/${postId}`)
      .then((res) => {
        if (res.status === 404) {
          toast.error("This isn't the post you're looking for");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setPost(data.post);
        setReactionCounts(data.reactionCounts);
        setComments(data.comments);
      });
  }, [postId]);

  if (!post) return null;

  const deletePost = () => {


    var txt;
    var r = window.confirm("Are you sure you want to delete this? It cannot be undone.");
    if (r == true) {
      getToken()
        .then((token) => {
          fetch(`../api/post/${postId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(history.push("/explore/"))
        })


    } else {

    }






  }

  const ImageClip = () => {
    if (post.imageLocation !== null) {
      return (
        <Jumbotron
          className="post-details__jumbo"
          style={{ backgroundImage: `url('${post.imageLocation}')` }}
        ></Jumbotron>
      )
    }
    else {
      return (
        <Jumbotron
          className="post-details__jumbo"
          style={{ backgroundImage: `url('https://build.dfomer.com/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default.jpg')` }}
        ></Jumbotron>

      )
    }
  }

  const TrashCan = () => {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    if (user.id === post.userProfileId) {
      return (
        <div className="delete-post-button" onClick={() => { deletePost() }}>🗑️</div>
      )
    }
    else {
      return null
    }
  }

  return (
    <div>
      <ImageClip />
      <div className="container">
        <h1>{post.title}</h1>
        <h5 className="text-danger">{post.category.name}</h5>
        <div className="row">
          <div className="col">
            <p className="d-inline-block">{post.userProfile.displayName}</p>
          </div>
          <div className="col">
            <div>{formatDate(post.publishDateTime)}
              <TrashCan />
            </div>
          </div>
        </div>
        <div className="text-justify post-details__content">{post.content}</div>
        <div className="my-4">
          <PostReactions postReactions={reactionCounts} />
        </div>
        <PostComments postComments={comments} />
      </div>
    </div>
  );
};

export default PostDetails;
