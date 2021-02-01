import React, {Fragment } from "react";
import "./welcomeNav.scss";
import { Navbar, Nav } from "react-bootstrap";

export default function WelcomeAbout(props) {
  const links = props.scorller;

  const [width, setDimensions] = React.useState(window.innerWidth);
  React.useEffect(() => {
    function handleResize() {
      setDimensions(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  });
  return (
    <Fragment>
      {/* <div className ="row">
                  <div className ="nav-item"> פוסטים אחרונים</div>
                  <div className ="nav-item"> הנצפים ביותר</div>
                  <div className ="nav-item"> טעימה מחו"ל</div>
                  <div className ="nav-item"> מתוך האינטסגרם</div>
              </div> */}
      <Navbar collapseOnSelect expand="lg" className="mt-2">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {width >= 992 ? (
            <Nav className="mr-auto">
              <Nav.Link>{links.instagram}</Nav.Link>
              <Nav.Link disabled>/</Nav.Link>
              <Nav.Link>{links.world}</Nav.Link>
              <Nav.Link disabled>/</Nav.Link>
              <Nav.Link>{links.featured}</Nav.Link>
              <Nav.Link disabled>/</Nav.Link>
              <Nav.Link>{links.new}</Nav.Link>
            </Nav>
          ) : (
            <Nav className="mr-auto">
             <Nav.Link>{links.new}</Nav.Link>
             <Nav.Link>{links.featured}</Nav.Link>
             <Nav.Link>{links.world}</Nav.Link>
              <Nav.Link>{links.instagram}</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
}
