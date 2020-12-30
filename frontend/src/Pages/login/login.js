//*****imports******//
import React, {Fragment, Component} from "react";
//Containers
import Navbar from "../../containers/NavBar/navbar";
import Login from "../../containers/login/login";
//Components

//Style 7 Bootstrap

//others

//***** main *****//




class LoginPage extends Component {
    

   
    render (){  
    return ( 
        <Fragment>
            <Navbar> </Navbar>
        
            <Login></Login>
            
        </Fragment>
        )
            
    }
}   
export default LoginPage;


