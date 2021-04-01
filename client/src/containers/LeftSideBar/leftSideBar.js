import {Component,Fragment} from "react"
import "./leftSideBar.scss";
class LeftSideBar extends Component {
    
    render (){
    
    return ( 
        <Fragment>
            <div class = "leftSideBar">
                {this.props.text}
            </div>
       
        </Fragment>
        )
            
    }
}   
export default LeftSideBar
