import React, { Fragment } from "react";
import Card from "../../components/card/card";
import "./CardTrio.scss";

export default function CardTrio(props) {
  const blogPosts = props.data;
  console.log("posts", blogPosts);
  return (
    <Fragment>
      <div className="cardTrio">
        {blogPosts
          ? blogPosts.map(function (item, i) {
              return <Card blogData={item} key={i}></Card>;
            })
          : false}
      </div>
    </Fragment>
  );
}
