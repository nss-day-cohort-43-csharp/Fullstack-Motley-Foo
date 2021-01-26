import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/api/post/Home")
            .then((res) => res.json())
            .then((posts) => {
                setPosts(posts);
            });
    }, []);

    return (
        <div className="row">
            <div className="col-lg-2 col-xs-12"></div>
            <div className="col-lg-10 col-xs-12">
                <PostList posts={posts} />
            </div>
        </div>
    );
};

export default Home;