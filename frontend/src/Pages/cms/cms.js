import React,{Fragment, Component} from "react";
import Navbar from "../../containers/NavBar/navbar";
import CreatePost from "../../containers/cms/createPost"
import "./cms.scss";



class Cms extends Component {
    

    render (){  
    return ( 
        <Fragment>
            <Navbar>{console.log("hh")}</Navbar>
            <CreatePost></CreatePost>
        </Fragment>
        )
            
    }
}   
export default Cms;