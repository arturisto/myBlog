import React from "react";
import RecentPost from "./recentPost.js";

function RecentPosts(props) {
  const posts = props.posts;

  return (
    <div className="recent-posts">
      {posts.map(function (item, i) {
        return <RecentPost key={i} data={item} />;
      })}
    </div>
  );
}

export default RecentPosts;
