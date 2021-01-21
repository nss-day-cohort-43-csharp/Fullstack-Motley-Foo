import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Jumbotron } from 'reactstrap';
import PostComments from '../components/PostComments';
import PostReactions from '../components/PostReactions';
import formatDate from '../utils/dateFormatter';
import './PostDetails.css';
import { PostTagContext } from '../providers/PostTagProvider';
import PostTagCard from '../components/PostTagCard';
import { TagContext } from '../providers/TagProvider';
import { Button } from 'reactstrap';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { useHistory } from 'react-router-dom';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [reactionCounts, setReactionCounts] = useState([]);
  const { postTags, getPostsTags, addPostTag, deletePostTag } = useContext(
    PostTagContext
  );
  const { tags, getTags, setTags, getTagById } = useContext(TagContext);
  const { getCurrentUser } = useContext(UserProfileContext);
  const tagToSave = useRef(null);

  const currentUser = getCurrentUser();
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
        if (data != undefined) {
          setPost(data.post);
          setReactionCounts(data.reactionCounts);
          getPostsTags(postId);
          getTags();
        }
      });
  }, [postId]);

  if (!post) return null;

  const tagList = () => {
    if (postTags != null && currentUser.id === post.userProfile.id) {
      return postTags.map((postTag) => (
        <div className="m-4" key={postTag.id}>
          <PostTagCard postTag={postTag} />
          <Button
            onClick={(e) => {
              deletePostTag(postTag);
            }}
          >
            x
          </Button>
        </div>
      ));
    } else if (postTags != null) {
      return postTags.map((postTag) => (
        <div className="m-4" key={postTag.id}>
          <PostTagCard postTag={postTag} />
        </div>
      ));
    }
  };

  const postTagSaver = () => {
    const tagId = parseInt(tagToSave.current.value);
    if (tagId !== 0) {
      const postTag = {
        postId,
        tagId,
      };
      addPostTag(postTag);
      tagToSave.current.value = '0';
    }
  };

  const userCheck = () => {
    let empty = [];

    let dropdownTags = [];
    if (postTags) {
      for (const obj of postTags) {
        empty.push(obj.tagId);
      }

      tags.map((tag) => {
        if (!empty.includes(tag.id)) {
          dropdownTags.push(tag);
        } else {
          empty.push(tag.id);
        }
      });
    }

    if (currentUser.id === post.userProfile.id && dropdownTags) {
      return (
        <fieldset>
          <div className="form-group">
            <select defaultValue="" className="form-control" ref={tagToSave}>
              <option value="0" className="add-tag">
                Choose Tag...
              </option>
              {dropdownTags
                .filter((tag) => tag.active === true)
                .map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
            </select>
            <Button onClick={postTagSaver}>add</Button>
          </div>
        </fieldset>
      );
    }
  };

  const deletePost = () => {
    var r = window.confirm(
      'Are you sure you want to delete this? It cannot be undone.'
    );
    if (r == true) {
      getToken().then((token) => {
        fetch(`../api/post/${postId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(history.push('/myposts'));
      });
    }
  };

  const ImageClip = () => {
    if (post.imageLocation !== null) {
      return (
        <Jumbotron
          className="post-details__jumbo"
          style={{ backgroundImage: `url('${post.imageLocation}')` }}
        ></Jumbotron>
      );
    } else {
      return (
        <Jumbotron
          className="post-details__jumbo"
          style={{
            backgroundImage: `url('https://build.dfomer.com/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default.jpg')`,
          }}
        ></Jumbotron>
      );
    }
  };

  const TrashCan = () => {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    if (user.id === post.userProfileId) {
      return (
        <div
          className="delete-post-button"
          onClick={() => {
            deletePost();
          }}
        >
          🗑️
        </div>
      );
    } else {
      return null;
    }
  };

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
            <div>
              {formatDate(post.publishDateTime)}
              <TrashCan />
            </div>
          </div>
        </div>
        <div className="text-justify post-details__content">{post.content}</div>
        {userCheck()}
        Tags:
        {tagList()}
        <div className="my-4">
          <PostReactions postReactions={reactionCounts} />
        </div>
        <PostComments />
      </div>
    </div>
  );
};

export default PostDetails;
