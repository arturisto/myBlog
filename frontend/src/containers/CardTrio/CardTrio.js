import React, { Fragment } from "react";
import Card from "../../components/card/card";
import "./CardTrio.scss";

export default function CardTrio(props) {
  const blogPosts = props.data;
  return (
    <Fragment>
      <div className="cardTrio col w-75 m-auto">

        {blogPosts.map(function (item, i) {
          return <Card blogData={item}></Card>;
        })}
      </div>
    </Fragment>
  );
}
