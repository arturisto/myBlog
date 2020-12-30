//*****imports******//
import React, {Fragment, Component} from "react";
import {useParams } from "react-router-dom";
//Containers
import Navbar from "../../containers/NavBar/navbar";
import LeftSideBar from "../../containers/LeftSideBar/leftSideBar"
import RightSideBar from "../../containers/RightSideBar/rightSideBar"
//Components
import LayoutWrapper from "../../components/layoutWrapper/layoutWrapper";
//Style 7 Bootstrap
import Col from 'react-bootstrap/Col';
import "./blogPage.scss";
//others
import BlogPost from "./blogPost/blogPost"
import Row from 'react-bootstrap/Row'
//***** main *****//




class BlogPage extends Component {
    
    state = {
       blogTest :  "i was routerd here from",
       fillerText : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in libero sit amet sapien egestas euismod. Cras pulvinar nec felis ut interdum. Sed tempor dictum laoreet. Cras ac malesuada nunc. Nullam dignissim sodales quam, ut volutpat lacus fringilla sed. Praesent consectetur ac est eu gravida. Vestibulum scelerisque commodo erat, sed tempus urna sollicitudin at. Cras consequat, massa sed placerat iaculis, nulla lacus imperdiet nunc, et lobortis diam dolor ut lectus. Suspendisse eget est porta, feugiat eros quis, elementum quam.",
    }


    render (){  
    return ( 
        <Fragment>
            <Navbar> </Navbar>
        
          
            <Row fluid className="ml-5">
                {/* <Col lg = {3}>
                <LeftSideBar text = {this.state.fillerText} />  
                </Col> */}
                <Col lg = {8} >
                <BlogPost text = {this.state.blogTest}></BlogPost>
                </Col>
                <Col lg = {3}>
                    <RightSideBar  text = {this.state.fillerText}></RightSideBar>    
                </Col>
            </Row> 
            
            
        </Fragment>
        )
            
    }
}   
export default BlogPage

