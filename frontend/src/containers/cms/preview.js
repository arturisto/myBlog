import React from "react";
import Parser from "html-react-parser";
import "../../Pages/blogPage/blogPost/blogPost.scss"

export default function previewBlogPost(props) {
  const blogData = props.blogData ? Parser(props.blogData) : "";
  const blogTitle = props.blogTitle ? Parser(props.blogTitle) : "";

  return (
    <div className="mt-3 ml-5 mr-5 blog-fragment w-75">
      <h2>
        <i>{blogTitle}</i>
      </h2>
      {blogData}
    </div>
  );
}