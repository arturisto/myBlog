import {Component,Fragment} from "react"
import "./rightSideBar.scss";
class RightSideBar extends Component {
    
    render (){
    
    return ( 
        <div className = "rightSideBar">
             {this.props.text}
        </div>
        )
            
    }
}   
export default RightSideBar
