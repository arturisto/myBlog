//*****imports******//
import React, { Fragment, Component } from "react";
//Containers
import RightSideBar from "../../containers/RightSideBar/rightSideBar";
//Components
import BasicLoader from "../../components/loaders/basicLoader";
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
      isLoading: true,
    };
  }

  async componentDidMount() {
    const blogId = this.props.match.params.id;
    const blogEntry = await getSingleBlogEntry(blogId);
    console.log(blogEntry.body);
    this.setState({
      blogData: blogEntry.body,
      isLoading: false,
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
            {this.state.isLoading ? (
              <BasicLoader />
            ) : (
              <BlogPost blogData={this.state.blogData} />
            )}
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
