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
import WelcomeNav from "./welcomeNav/welcomeNav";
import CardTrio from "../../containers/CardTrio/CardTrio";
//components
import MiddleHeadline from "../../components/middleHeadline/middleHeadline";
import BackToTop from "../../components/buttons/backToTop/backToTop";
import BasicLoader from "../../components/loaders/basicLoader";
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
      isLatestLoading: true,
    };
    this.scollers = scrollers;
    this.handleBackToTop = this.handleBackToTop.bind(this);
    this.handleRoute = this.handleRoute.bind(this);
  }

  async componentDidMount() {
    console.log("try to load on main");
    //   const latestBlogs = await getLatestBlogs();
    //   console.log(latestBlogs);
    //   this.setState({
    //     latestBlogs: latestBlogs,
    //     isLatestLoading: false,
    //   });
  }

  handleRoute(link) {
    this.props.history.push(link);
  }
  handleBackToTop() {
    scroll.scrollToTop();
  }

  render() {
    return (
      <div className="col pr-0 pl-0">
        <div className="main">
          <div className="intro">Mr and Mrs Eat</div>
          <div className="banner">
            <img
              className="banner-img"
              src="https://mrandmrseatmedia.s3.us-east-2.amazonaws.com/banner.jpg"
              alt=""
            />
          </div>
          <div className="mainIntroWrapper">
            <WelcomeNav scorller={this.scollers} />
          </div>
          <div>hello amplify</div>
          {/* <div className="mainContentWrapper">
            <div className="subMainContentWrapper">
              <MiddleHeadline id="latest" text="כתבות אחרונות" />
              <Element name="latest" />
              {this.state.isLatestLoading ? (
                <BasicLoader />
              ) : (
                <CardTrio data={this.state.latestBlogs} />
              )}

              <Button
                variant="primary"
                size="lg"
                onClick={() => this.handleRoute("/local")}
              >
                לכל הכתבות
              </Button>
            </div>
            <div className="subMainContentWrapper">
              <MiddleHeadline id="featured" text="הנצפים ביותר" />
              <Element name="featured" />
              <CardTrio data={this.state.latestBlogs} />
              <Button variant="primary" size="lg">
                לכל הכתבות
              </Button>
            </div>
            <div className="subMainContentWrapper">
              <MiddleHeadline id="aroundTheWorld" text="מסביב לעולם" />
              <Element name="aroundTheWorld" id="aroundTheWorld" />
              <CardTrio data={this.state.latestBlogs} />
              <Button variant="primary" size="lg">
                לכל הכתבות
              </Button>
            </div>
            <div className="subMainContentWrapper">
              <MiddleHeadline id="instush" text="מתוך האינסטגרם שלנו" />
              <Element name="instush" id="instush" />
              <CardTrio data={this.state.latestBlogs} />
              <Button variant="primary" size="lg">
                לכל הכתבות
              </Button>
            </div>
            <div className="subMainContentWrapper">
              <MiddleHeadline text="Top Travel Destinations"></MiddleHeadline>
              <CardTrio></CardTrio>
              <Button variant="primary" size="lg">
                More Destination
              </Button>
            </div>
          </div> */}
        </div>
        <BackToTop onBackToTop={() => this.handleBackToTop()} />
      </div>
    );
  }
}
export default Main;
