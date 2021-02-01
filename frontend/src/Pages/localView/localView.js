//*****imports******//
import React, { Fragment, Component } from "react";
//Containers
import NavigationBar from "../../containers/NavBar/navbar";
import Navbar from "../../containers/NavBar/navbar";
import LeftSideBar from "../../containers/LeftSideBar/leftSideBar";
import RightSideBar from "../../containers/RightSideBar/rightSideBar";
//Components
import LayoutWrapper from "../../components/layoutWrapper/layoutWrapper";
import TagsNavBar from "../../components/tagsNavBar/tagsNavBar"
//Style & Bootstrap
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./localView.scss";
//others

//actions
//***** main *****//

class LocalView extends Component {
  constructor(props) {
      super(props)
      this.state={}
  }


  render(){
      return(
        <div className="col pr-0 pl-0">
        <NavigationBar> </NavigationBar>
        <TagsNavBar></TagsNavBar>
        </div>
      )
  }
};

export default LocalView;