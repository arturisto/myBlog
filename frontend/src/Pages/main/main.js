import { Component, Fragment } from "react";

//containers
import NavigationBar from "../../containers/NavBar/navbar";
import WelcomeAbout from "./welcomeAbout/welcomeAbout";
import CardTrio from "../../containers/CardTrio/CardTrio";
//components
import MiddleHeadline from "../../components/middleHeadline/middleHeadline";
//bootstrap items
import Button from "react-bootstrap/Button";
//styles
import "./main.scss";

//actions
import {getLatestBlogs} from "../../actions/blogActions"

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        latestBlogs:[],
    };
  }

  async componentDidMount() {
     const latestBlogs =await getLatestBlogs();
     this.setState({
         latestBlogs:latestBlogs,
     })
     
  }
  render() {
    return (
      <Fragment>
        <NavigationBar> </NavigationBar>
        <div className="main">
          <div className="mainWrapper">
            <WelcomeAbout></WelcomeAbout>
          </div>
          <div className="mainContentWrapper">
            <div className="subMainContentWrapper">
              <MiddleHeadline text="Latest Blogs"></MiddleHeadline>
              <CardTrio 
              data = {this.state.latestBlogs} ></CardTrio>
              {/* <Button variant="primary" size="lg">
                More Blogs
              </Button> */}
            </div>
            {/* <div className="subMainContentWrapper">
              <MiddleHeadline text="Top Travel Destinations"></MiddleHeadline>
              <CardTrio></CardTrio>
              <Button variant="primary" size="lg">
                More Destination
              </Button>
            </div> */}
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Main;
