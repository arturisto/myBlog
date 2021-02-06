import { Component, Fragment } from "react";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

//containers
import NavigationBar from "../../containers/NavBar/navbar";
import WelcomeNav from "./welcomeNav/welcomeNav";
import CardTrio from "../../containers/CardTrio/CardTrio";
import Footer from "../../containers/Footer/Footer";
//components
import MiddleHeadline from "../../components/middleHeadline/middleHeadline";
import BackToTop from "../../components/buttons/backToTop/backToTop";
import Carusel from "../../components/imageCarusel/carusel"
//bootstrap items
import Button from "react-bootstrap/Button";
//styles
import "./main.scss";

//actions
import { getLatestBlogs } from "../../actions/blogActions";

const scrollers = {
  new: (
    <Link
      activeClass="active"
      to="latest"
      spy={true}
      smooth={true}
      duration={1000}
      offset={-150}
    >
      פוסטים חדשים
    </Link>
  ),
  featured: (
    <Link
      activeClass="active"
      to="featured"
      spy={true}
      smooth={true}
      duration={1000}
      offset={-150}
    >
      הנצפים ביותר
    </Link>
  ),
  world: (
    <Link
      activeClass="active"
      to="aroundTheWorld"
      spy={true}
      smooth={true}
      duration={1000}
      offset={-150}
    >
      מהעולם הגדול
    </Link>
  ),
  instagram: (
    <Link
      activeClass="active"
      to="instush"
      spy={true}
      smooth={true}
      duration={1000}
      offset={-150}
    >
      מתוך האינסטגרם
    </Link>
  ),
};
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestBlogs: [],
    };
    this.scollers = scrollers;
    this.handleBackToTop = this.handleBackToTop.bind(this);
  }

  async componentDidMount() {
    const latestBlogs = await getLatestBlogs();
    this.setState({
      latestBlogs: latestBlogs,
    });
  }

  handleBackToTop (){
    scroll.scrollToTop();
  }

  render() {
    return (
      <div className="col pr-0 pl-0">
        <NavigationBar> </NavigationBar>
        <div className="main">
          <div className="intro">Mr and Mrs Eat</div>
          {/* <Carusel></Carusel> */}
          <div className="banner">
          <img className="banner-img" src="https://mrandmrseatmedia.s3.us-east-2.amazonaws.com/banner.jpg" alt=""/>
          </div>
          <div className="mainIntroWrapper">
            <WelcomeNav scorller={this.scollers}></WelcomeNav>
          </div>
          <div className="mainContentWrapper">
            <div className="subMainContentWrapper">
              <MiddleHeadline id="latest" text="כתבות אחרונות"></MiddleHeadline>
              <Element name="latest"></Element>
              <CardTrio data={this.state.latestBlogs}></CardTrio>
              <Button variant="primary" size="lg">
                לכל הכתבות
              </Button>
            </div>
            <div className="subMainContentWrapper">
              <MiddleHeadline
                id="featured"
                text="הנצפים ביותר"
              ></MiddleHeadline>
              <Element name="featured"></Element>
              <CardTrio data={this.state.latestBlogs}></CardTrio>
              <Button variant="primary" size="lg">
                לכל הכתבות
              </Button>
            </div>
            <div className="subMainContentWrapper">
              <MiddleHeadline
                id="aroundTheWorld"
                text="מסביב לעולם"
              ></MiddleHeadline>
              <Element name="aroundTheWorld" id="aroundTheWorld"></Element>
              <CardTrio data={this.state.latestBlogs}></CardTrio>
              <Button variant="primary" size="lg">
                לכל הכתבות
              </Button>
            </div>
            <div className="subMainContentWrapper">
              <MiddleHeadline
                id="instush"
                text="מתוך האינסטגרם שלנו"
              ></MiddleHeadline>
              <Element name="instush" id="instush"></Element>
              <CardTrio data={this.state.latestBlogs}></CardTrio>
              <Button variant="primary" size="lg">
                לכל הכתבות
              </Button>
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
        <BackToTop onBackToTop={()=>this.handleBackToTop()}></BackToTop>
        <Footer></Footer>
      </div>
    );
  }
}
export default Main;
