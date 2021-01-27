import React, { useEffect, useState, useContext } from "react";
import PostList from "../components/PostList";
import './MyPosts.css';
import { UserProfileContext } from "../providers/UserProfileProvider"
import WindowChecker from "../utils/WindowChecker";

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const user = JSON.parse(localStorage.getItem('userProfile'));

    useEffect(() => {
        WindowChecker()
        getToken().then((token) =>
            fetch(`/api/post/getbyuser/${user.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }))
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