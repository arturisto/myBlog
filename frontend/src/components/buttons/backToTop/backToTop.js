import Button from "react-bootstrap/Button";

export default function BackToTop(props) {
  return (
    <Button variant="info" size="sm" className="back-to-top" onClick={()=>props.onBackToTop()}>
      Back to Top
    </Button>
  );
}
