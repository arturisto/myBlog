//*****imports******//
import React, { Fragment, Component } from "react";
//Containers
import Navbar from "../../containers/NavBar/navbar";
import RightSideBar from "../../containers/RightSideBar/rightSideBar";
import Footer from "../../containers/Footer/Footer";
//Components
//Style & Bootstrap
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./blogPage.scss";
//others
import BlogPost from "./blogPost/blogPost";

//actions
import { getSingleBlogEntry } from "../../actions/blogActions";
//***** main *****//

class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogData: false,
      isPreview: false,
    };
  }

  async componentDidMount() {
    const blogId = this.props.match.params.id;
    const blogEntry = await getSingleBlogEntry(blogId);
    console.log(blogEntry.body);
    this.setState({
      blogData: blogEntry.body,
    });
  }
  render() {
    return (
      <Fragment>
        <Row className="ml-5">
          {/* <Col lg = {3}>
                <LeftSideBar text = {this.state.fillerText} />  
                </Col> */}
          <Col lg={8}>
            <BlogPost blogData={this.state.blogData} />
          </Col>
          <Col lg={3}>
            <RightSideBar />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default BlogPage;
