import React, {Component, Fragment} from "react"
import Card from "../../components/card/card"

import "./CardTrio.scss"
import {placePictures} from "../../assets/images/imageConstants"

class CardTrio extends Component {
    render (){
        return (
            <Fragment >
                <div className = "cardTrio row w-75 m-auto">    
                    <Card
                        title = "hello there"
                        body= "this is my body"
                        img_src ={placePictures.dishoom} 
                        blog_link = "blogpage/22" 
                            >
                    </Card>
                    <Card
                        title = "hello there"
                        body= "this is my body"
                        img_src ={placePictures.dishoom}
                        blog_link = "blogpage/22"  >  
                    </Card>
                    <Card
                        title = "hello there"
                        body= "this is my body"
                        img_src ={placePictures.dishoom} 
                        blog_link = "blogpage/22" >  
                    </Card>
                 </div>  
            </Fragment>

        )
    
    
    }


}

export default CardTrio
