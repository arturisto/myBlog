//*****imports******//
import React, { Fragment, Component } from "react";
//Containers
import Navbar from "../../containers/NavBar/navbar";
import Login from "../../containers/login/login";
import SignUp from "../../containers/login/signUp";

//Bootstrap
import Button from "react-bootstrap/Button";
//styles
import "./login.scss";
//***** main *****//

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin(status) {
    if (status) {
      this.setState({
        isLoggedIn: true,
      });
    } else {
      this.setState({
        isLoggedIn: false,
      });
      alert("error logging in");
    }
  }
  handleSignup(status) {
    status ? alert("user created successfully") : alert("error creating user");
  }

  render() {
    return (
      <Fragment>
        <div className="auth-form">
          {this.state.isLoggedIn ? (
            <>
              <SignUp onSignup={(status) => this.handleSignup(status)}></SignUp>
            </>
          ) : (
            <Login onLogin={(status) => this.handleLogin(status)}></Login>
          )}
        </div>
      </Fragment>
    );
  }
}
export default LoginPage;
