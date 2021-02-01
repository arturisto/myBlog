import Button from "react-bootstrap/Button";
import "./tagsNavBar.scss";
export default function tagsNavBar(props) {
  const tags = [
    "אסייתי",
    "אוכל רחוב",
    "אוכל רחוב",
    "קוקטיילים",
    "חומוס",
    "שחיתות",
    "המבורגר",
    "כשר",
    "קינוחים",
    "מסעדת שף",
    "ארוחת בוקר",
    "סושי",
    "איטלקי",
  ];
  return (
    <div className="tags-main">
      {tags.map((tag, index) => {
        return (
          <Button  key={index} className="tag-button" variant="primary" size="sm">
            {tag}
          </Button>
        );
      })}
    </div>
  );
}
