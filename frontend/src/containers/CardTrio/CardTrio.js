import React, { Fragment } from "react";
import Card from "../../components/card/card";
import "./CardTrio.scss";

export default function CardTrio(props) {
  const blogPosts = props.data;
  return (
    <Fragment>
      <div className="cardTrio col w-75 m-auto">
        {/* <Card
                        title = "hello there"
                        body= "this is my body"
                        img_src ={placePictures.dishoom} 
                        blog_link = "blogpage/22" 
                            >
                    </Card>
                    <Card
                        title = "hello there"
                        body= "this is my body"
                        img_src ={placePictures.dishoom}
                        blog_link = "blogpage/22"  >  
                    </Card>
                    <Card
                        title = "hello there"
                        body= "this is my body"
                        img_src ={placePictures.dishoom} 
                        blog_link = "blogpage/22" >  
                    </Card> */}

        {blogPosts.map(function (item, i) {
          return <Card blogData={item}></Card>;
        })}
      </div>
    </Fragment>
  );
}
