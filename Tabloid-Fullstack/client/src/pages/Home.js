import React, { useEffect, useState, useContext } from "react";
import PostList from "../components/PostList";
import { UserProfileContext } from "../providers/UserProfileProvider"
import WindowChecker from "../utils/WindowChecker";


const Home = () => {
    const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    useEffect(() => {
        WindowChecker()
        getToken().then((token) =>
            fetch("/api/post/Home", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }))
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