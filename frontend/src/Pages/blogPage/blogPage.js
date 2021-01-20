//*****imports******//
import React, { Fragment, Component } from "react";
import { useParams } from "react-router-dom";
//Containers
import Navbar from "../../containers/NavBar/navbar";
import LeftSideBar from "../../containers/LeftSideBar/leftSideBar";
import RightSideBar from "../../containers/RightSideBar/rightSideBar";
//Components
import LayoutWrapper from "../../components/layoutWrapper/layoutWrapper";
//Style & Bootstrap
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./blogPage.scss";
//others
import BlogPost from "./blogPost/blogPost";

//actions
import { getSingleBlogEntry } from "../../actions/userActions";
//***** main *****//

class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogData: false,
      isPreview:false,
    };
  }

  async componentDidMount() {
    const blogId = 10034;
    const blogEntry = await getSingleBlogEntry(blogId);
    console.log(blogEntry.body);
    this.setState({
      blogData: blogEntry.body,
    });
  }
  render() {
    return (
      <Fragment>
       <Navbar></Navbar>
        <Row className="ml-5">
          {/* <Col lg = {3}>
                <LeftSideBar text = {this.state.fillerText} />  
                </Col> */}
          <Col lg={8}>
            <BlogPost blogData={this.state.blogData}></BlogPost>
          </Col>
          <Col lg={3}>
            <RightSideBar text={this.state.fillerText}></RightSideBar>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default BlogPage;
