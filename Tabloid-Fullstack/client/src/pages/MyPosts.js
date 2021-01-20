import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import './MyPosts.css';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem('userProfile'));

    useEffect(() => {
        fetch(`/api/post/getbyuser/${user.id}`)
            .then((res) => res.json())
            .then((posts) => {
                setPosts(posts);
            });
    }, []);

    return (
        <div className="row">
            <h1 className="myposts-title">My Posts</h1>
            <div className="col-lg-2 col-xs-12"></div>

            <div className="col-lg-10 col-xs-12 myposts-posts">

                <PostList posts={posts} />
            </div>
        </div>
    );
};

export default MyPosts;