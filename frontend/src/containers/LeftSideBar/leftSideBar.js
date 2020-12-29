import {Component,Fragment} from "react"

class LeftSideBar extends Component {
    
    render (){
    
    return ( 
        <Fragment>
            {this.props.text}
       
        </Fragment>
        )
            
    }
}   
export default LeftSideBar
