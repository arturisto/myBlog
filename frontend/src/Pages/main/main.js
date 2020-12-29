import {Component, Fragment} from "react";
import NavigationBar from "../../containers/NavBar/navbar"
import WelcomeAbout from "./welcomeAbout/welcomeAbout"
import "./main.scss"
import CardTrio from "../../containers/CardTrio/CardTrio"
import MiddleHeadline from "../../components/middleHeadline/middleHeadline"
import Button from "../../components/buttons/button"



export default function Main() {


        return ( 
            <Fragment>
                 <NavigationBar> </NavigationBar>
                <div className="main">                  
                    <div className="mainWrapper">
                        <WelcomeAbout></WelcomeAbout>
                    </div>
                    <div className="mainContentWrapper">
                        <div className ="subMainContentWrapper">
                            <MiddleHeadline text="Latest Blogs"></MiddleHeadline>
                            <CardTrio></CardTrio>
                            <Button
                                    link = "#"
                                    type = "btn btn-primary btn-lg"
                                    title = "More Blogs">
                            </Button>
                        </div>
                        <div className="subMainContentWrapper"> 
                            <MiddleHeadline text="Top Travel Destinations"></MiddleHeadline>
                            <CardTrio></CardTrio>
                            <Button
                                    link = "#"
                                    type = "btn btn-secondary btn-lg"
                                    title = "More Destination">
                            </Button>                            
                        </div>
                    </div>
                </div>
            </Fragment>
            )
        }
