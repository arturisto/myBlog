import React,{Fragment, Component} from "react";
import Navbar from "../../containers/NavBar/navbar";
import CmsManager from "../../containers/cms/cmsManager";
import "./cms.scss";



class Cms extends Component {
    

    render (){  
    return ( 
        <Fragment>
            <Navbar></Navbar>
            
            <CmsManager></CmsManager>
        </Fragment>
        )
            
    }
}   
export default Cms;