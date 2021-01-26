import React from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import formatDate from "../utils/dateFormatter";
import "./PostSummaryCard.css";
import { useHistory } from "react-router-dom";

const PostSummaryCard = ({ post }) => {
  const history = useHistory();

  const ImageCard = () => {
    if (post.imageLocation === null) {
      return (
        <div
          className="post-summary__img"
          style={{
            backgroundImage: `url('https://build.dfomer.com/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default.jpg')`,
          }}
        ></div>
      )
    }
    else {
      return (
        <div
          className="post-summary__img"
          style={{
            backgroundImage: `url(${post.imageLocation})`,
          }}
        ></div>
      )
    }
  }


  const directToEdit = () => {
    history.push(`/editpost/${post.id}`)
  }

  const EditButton = () => {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    if (post.authorId === user.id) {
      return (
        <div className="ml-5 edit-post-button" onClick={() => { directToEdit() }}>EDIT</div>
      )
    } else {
      return null
    }
  }

  return (
    <Card className="post-summary__card">
      <div className="row">
        <div className="col-lg-3 col-sm-12">
          <Link to={`/post/${post.id}`}>
            <ImageCard />
          </Link>
        </div>
        <div className="col-lg-5 col-sm-12 py-3">
          <div>
            <Link to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <strong className="text-danger">{post.category.name}</strong>
          </div>
          <p className="text-justify mx-5">{post.previewText}</p>
        </div>
        <div className="col-lg-4 col-sm-12 mt-2 py-3 text-left">
          <p className="ml-5 text-info">Written by {post.authorName}</p>
          <p className="ml-5">
            Published on {formatDate(post.publishDateTime)}
          </p>
          <EditButton />
        </div>
      </div>
    </Card>
  );
};

export default PostSummaryCard;
