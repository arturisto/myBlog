import React, { Fragment,Component } from "react";
import "./cmsComponent.scss";
import CreatePost from "./createPost";



class CmsManager extends Component {
    constructor(props) {
        super(props);
    
        this.toggleView = this.toggleView.bind(this);
        this.state = {
          activeTab: 'create'
        };
      }
    toggleView(pane){
        this.setState({
            activeTab:pane
        })
    }   
    render (){  
    return ( 
        <Fragment>

            <div className="container-row">
                <div className="navPane">
                    <div><button onClick={()=> {this.toggleView("create")}}>Create</button></div>
                    <div><button onClick={()=> {this.toggleView("display")}}>Display</button></div>
                </div>
                <div className = "tabPane">
                    {this.state.activeTab ==="create"? (
                        <div className="createEntry" id="createEntry" >
                            <CreatePost></CreatePost>
                        </div>):
                        (<div className="showEntires" id = "showEntires"> Test</div>)
                    }
                </div>


            </div>

                {/* <Tab.Container  id="left-tabs-example" defaultActiveKey="first"  >
                    <Row className="mt-15px">
                        <Col sm={2} xl={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                            <Nav.Link eventKey="create" >Create Entry</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="view">View Entries</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={10}  xl={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="create">
                            <CreatePost></CreatePost>
                            </Tab.Pane>
                            <Tab.Pane eventKey="view">
                                test
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container> */}

             
        </Fragment>
        )
            
    }
}   
export default CmsManager;

// export default function cmsManager (){



//     return(
//         <div>hi</div>
//     )
// }