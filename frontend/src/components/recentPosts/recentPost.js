import React, { useEffect, useState } from "react";
import "./recentPosts.scss";
import { getBaseFrontUrl } from "../../actions/utils";
function RecentPost(props) {
  const post = props.data;
  console.log(post);
  const baseUrl = getBaseFrontUrl(post.id);
  const postUrl = baseUrl + "blogpage/" + post.id;

  return (
    <div className="recent-posts">
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={post.previewImageUrl} className="card-img" alt="..." />
          </div>
          <div className="col-md-8 pr-2 pt-3 d-flex flex-column justify-content-around ">
            <div>
              <div className="recent-post-title">
                <a href={postUrl} alt={"blog post " + post.title}>
                  {post.title}
                </a>
              </div>
            </div>
            <div className="card-bottom published-at ">
              Published {post.publishedAt} 19.12.12
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentPost;
