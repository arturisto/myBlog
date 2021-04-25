import React, { useState } from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from "../../assets/images/logo.jpg";
import "./navbar.scss";
import { SocialIcon } from "react-social-icons";

const navbar_items = [
  ["צור קשר", "#"],
  ["מי אנחנו", "#"],
  ["מתכונים", "/construction"],
  ['בחו"ל', "/local"],
  ["בארץ", "/local"],
];
const dropdown_data = [
  ["תל אביב", "#"],
  ["מרכז", "#"],
  ["צפון", "#"],
  ["דרום", "#"],
];

export default function NavigationBar() {
  const [isMobileBackgroundDIv, setMobileBackgroundDIv] = useState(false);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img src={logo} width="60" height="40" alt="logo"></img>
        </a>

        <div className="nav-item">
          <SocialIcon
            url="https://www.facebook.com/mr.and.mrs.eat"
            network="facebook"
            style={{ height: 25, width: 25, margin: 7 }}
          />
        </div>
        <div className="nav-item">
          <SocialIcon
            url="https://www.facebook.com/mr.and.mrs.eat"
            network="instagram"
            bgColor="#ff5a01"
            style={{ height: 25, width: 25, margin: 7 }}
          />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            onClick={() => setMobileBackgroundDIv(!isMobileBackgroundDIv)}
          ></span>
        </button>

        <div
          className="collapse navbar-collapse mobileBackground"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav ml-auto">
            <a className="nav-item nav-link active" href="#">
              צור קשר
            </a>
            <a className="nav-item nav-link" href="#">
              מי אנחנו
            </a>
            <a className="nav-item nav-link" href="/construction">
              מתכונים
            </a>
            <a className="nav-item nav-link" href="/local">
              בחו"ל
            </a>
            <a className="nav-item nav-link active" href="/local">
              בארץ
            </a>
          </div>
        </div>
      </nav>
      {isMobileBackgroundDIv ? (
        <div className="mobile-background-dv"></div>
      ) : (
        <></>
      )}
    </div>
  );
}
