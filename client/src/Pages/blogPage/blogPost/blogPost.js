import React, { Fragment } from "react";
import "./blogPost.scss";

// import test from "../../../actions/test_fe_be";
import Parser from "html-react-parser";

export default function blogPost(props) {
  const blogData = props.blogData ? Parser(props.blogData.content) : "";
  const blogTitle = props.blogData ? Parser(props.blogData.title) : "";

  return (
    <div className="mt-3 ml-5 mr-5 blog-fragment ">
      <h2>
        <i>{blogTitle}</i>
      </h2>
      {blogData}
    </div>
  );
}