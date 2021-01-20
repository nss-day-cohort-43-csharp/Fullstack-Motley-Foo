import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Jumbotron } from 'reactstrap';
import PostComments from '../components/PostComments';
import PostReactions from '../components/PostReactions';
import formatDate from '../utils/dateFormatter';
import './PostDetails.css';
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Jumbotron } from "reactstrap";
import PostReactions from "../components/PostReactions";
import formatDate from "../utils/dateFormatter";
import "./PostDetails.css";
import { PostTagContext } from "../providers/PostTagProvider"
import PostTagCard from "../components/PostTagCard"
import { TagContext } from "../providers/TagProvider"


const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [reactionCounts, setReactionCounts] = useState([]);
  const [comments, setComments] = useState([]);
  const { postTags, getPostsTags, addPostTag } = useContext(PostTagContext);
  const { tags, getTags, setTags } = useContext(TagContext);

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
        getPostsTags(postId);
        getTags()
      });
  }, [postId]);

  if (!post) return null;

  const tagList = () => {
    if (postTags != null) {
      return (
        postTags.map((postTag) => (
          <div className="m-4" key={postTag.id}>
            <PostTagCard postTag={postTag} />
          </div>
        ))
      )
    }
  }

  const postTagSaver = () => {
    const tagId = parseInt(document.querySelector(".add-tag").value)
    if (tagId !== 0) {
      const postTag = {
        postId,
        tagId
      }
      addPostTag(postTag)
    }
  }

  return (
    <div>
      <Jumbotron
        className="post-details__jumbo"
        style={{ backgroundImage: `url('${post.imageLocation}')` }}
      ></Jumbotron>
      <div className="container">
        <h1>{post.title}</h1>
        <h5 className="text-danger">{post.category.name}</h5>
        <div className="row">
          <div className="col">
            <img
              src={post.userProfile.imageLocation}
              alt={post.userProfile.displayName}
              className="post-details__avatar rounded-circle"
            />
            <p className="d-inline-block">{post.userProfile.displayName}</p>
          </div>
          <div className="col">
            <p>{formatDate(post.publishDateTime)}</p>
          </div>
        </div>
        <div className="text-justify post-details__content">{post.content}</div>
        {tagList()}
        <fieldset>
          <div className="form-group">
            <select defaultValue="" className="form-control" >
              <option value="0" class="add-tag">Choose Tag...</option>
              {tags.filter(tag => tag.active === true).filter(tag => !postTags.includes(tag.name)).map(l => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
            <button onClick={(e) => { postTagSaver() }}>add</button>
          </div>
        </fieldset>
        <div className="my-4">
          <PostReactions postReactions={reactionCounts} />
        </div>
        <PostComments postComments={comments} />
      </div>
    </div>
  );
};

export default PostDetails;
