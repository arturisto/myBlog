import React, {Component, Fragment} from 'react';
import "./WelcomeAboutStyle.scss";



class WelcomeAbout extends Component {

    render (){
        return (
            <Fragment>
                <div className ="welcomeMain"> 
                    <div className= "welcomeText">
                        <h2>!היי</h2><br></br>
                        <p> אנחנו ארתור ויעל ואנחנו אוהבים לאכול  </p>
                        <p> Our passion, after the eating and traveling is to share our experience with everybody else</p>
                        </div>
                </div>
            </Fragment>
        )
    }
}

export default WelcomeAbout