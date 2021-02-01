import React from "react";
import Parser from "html-react-parser";
import { getBaseFrontUrl } from "../../actions/utils";
import "./card.scss";

export default function Cards(props) {
  const blogData = props.blogData;
  const content = blogData.content;

  const blogId = blogData.id;
  const baseUrl = getBaseFrontUrl(blogId);
  const postUrl = baseUrl + "blogpage/" + blogId;
  const preview = createPewviewText(content);

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-toolbar"> מתי פורסם וכאלה</div>
        <div className="card-inner-body">
          <h5 className="card-title">{blogData.title}</h5>
          <div className="card-text-wrapper">
            <div className="card-text">{Parser(preview)}</div>
          </div>
        </div>
        <div className="card-bottom"> עוד דברים כאלה ואחרים ילכו פה</div>
      </div>

      <a href={postUrl}>
        <img
          src={blogData.previewImageUrl}
          className="card-img-top"
          alt="..."
        ></img>
      </a>
    </div>
  );
}

const createPewviewText = (content) => {
  let element = document.createElement("div");
  element.innerHTML = content;
  let nodes = element.childNodes;
  let arrayOfNodes = Array.from(nodes);
  let previewText = "";
  for (let i = 0; i < arrayOfNodes.length; i++) {
    if (arrayOfNodes[i].tagName === "a") {
      previewText += " " + arrayOfNodes[i];
    } else {
      previewText += " " + arrayOfNodes[i].innerText;
    }
  }
  const shorterPreview = previewText.slice(0, 200);
  return shorterPreview + "...";
};
