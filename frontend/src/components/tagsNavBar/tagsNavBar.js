import Button from "react-bootstrap/Button";
import "./tagsNavBar.scss";
export default function tagsNavBar(props) {
  const tags = props.tags;
  const clickedTags = props.clickedTags ? props.clickedTags : [];
  return (
    <div className="tags-main">
      {tags.map((tag, index) => {
        return (
          <Button
            key={tag.id}
            className="tag-button"
            variant={clickedTags.includes(tag.id) ? "success" : "primary"}
            size="sm"
            onClick={() => props.onClick(tag.id)}
          >
            {tag.name}
          </Button>
        );
      })}
    </div>
  );
}
