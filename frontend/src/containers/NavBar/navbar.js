/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from "../../assets/images/logo.jpg";
import "./navbar.scss";
import Navbar from "react-bootstrap/Navbar";
import { SocialIcon } from "react-social-icons";

const dropdown_data = [
  ["תל אביב", "#"],
  ["מרכז", "#"],
  ["צפון", "#"],
  ["דרום", "#"],
];

export default function NavigationBar() {
  return (
    <Navbar
      className="navbar navbar-expand-lg navbar-light bg-light"
      sticky="top"
      fixed="top"
    >
      <a className="navbar-brand" href="/">
        <img src={logo} width="60" height="40" alt="logo"></img>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse pl-3 pr-4 mr-4"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <SocialIcon
              url="https://www.facebook.com/mr.and.mrs.eat"
              network="facebook"
              style={{ height: 25, width: 25, margin: 7 }}
            />
          </li>
          <li className="nav-item">
            <SocialIcon
              url="https://www.facebook.com/mr.and.mrs.eat"
              network="instagram"
              bgColor="#ff5a01"
              style={{ height: 25, width: 25, margin: 7 }}
            />
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              צרו קשר
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              מי אנחנו
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/construction">
              מתכונים
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/construction">
              בחול
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/local">
              בארץ
            </a>
          </li>

          {/* <li className="nav-item dropdown">
            <a
              className="nav-link "
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              בארץ
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {dropdown_data.map((value, index) => {
                return (
                  <a className="dropdown-item" href={value[1]} key={index}>
                    {value[0]}
                  </a>
                );
              })}
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                אחר
              </a>
            </div>
          </li> */}
          <li className="nav-item active">
            <a className="nav-link" href="/secretloginurl">
              {" "}
              <span className="loginLink">LogIn</span>
            </a>
          </li>
        </ul>
      </div>
    </Navbar>
  );
}
