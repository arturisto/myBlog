import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carusel.scss"



const images = [
  "https://mrandmrseatmedia.s3.us-east-2.amazonaws.com/%D7%94%D7%94%D7%9E%D7%91%D7%95%D7%A8%D7%92%D7%A8%D7%94%D7%97%D7%93%D7%A9%D7%A9%D7%9C%D7%A8%D7%90%D7%A9%D7%95%D7%9F%D7%9C%D7%A6%D7%99%D7%95%D7%9F%D7%95%D7%94%D7%A1%D7%91%D7%99%D7%91%D7%94/131507712_1263776150665442_4551838499252124030_o.jpg",
  "https://mrandmrseatmedia.s3.us-east-2.amazonaws.com/%D7%94%D7%94%D7%9E%D7%91%D7%95%D7%A8%D7%92%D7%A8%D7%94%D7%97%D7%93%D7%A9%D7%A9%D7%9C%D7%A8%D7%90%D7%A9%D7%95%D7%9F%D7%9C%D7%A6%D7%99%D7%95%D7%9F%D7%95%D7%94%D7%A1%D7%91%D7%99%D7%91%D7%94/131389496_1263776247332099_4785410554632236306_o.jpg",
  "https://mrandmrseatmedia.s3.us-east-2.amazonaws.com/%D7%94%D7%94%D7%9E%D7%91%D7%95%D7%A8%D7%92%D7%A8%D7%94%D7%97%D7%93%D7%A9%D7%A9%D7%9C%D7%A8%D7%90%D7%A9%D7%95%D7%9F%D7%9C%D7%A6%D7%99%D7%95%D7%9F%D7%95%D7%94%D7%A1%D7%91%D7%99%D7%91%D7%94/131410148_1263776143998776_2572466699674886672_o.jpg",
  "https://mrandmrseatmedia.s3.us-east-2.amazonaws.com/%D7%94%D7%94%D7%9E%D7%91%D7%95%D7%A8%D7%92%D7%A8%D7%94%D7%97%D7%93%D7%A9%D7%A9%D7%9C%D7%A8%D7%90%D7%A9%D7%95%D7%9F%D7%9C%D7%A6%D7%99%D7%95%D7%9F%D7%95%D7%94%D7%A1%D7%91%D7%99%D7%91%D7%94/131424864_1263776233998767_4912265107407554145_o.jpg",
];



export default class AutoPlay extends Component {
    render() {
      const settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed:2500,
        cssEase: "linear",
        swipe:false,
        touchMove:false,
        outerEdgeLimit: true,
      };
      return (
        <div className="ggg">
          <Slider {...settings}>
            <div>
              <h3><img  alt= "" src={images[0]}/></h3>
            </div>
            <div>
            <h3><img  alt= "" src={images[1]}/></h3>
            </div>
            <div>
            <h3><img  alt= "" src={images[2]}/></h3>
            </div>
            <div>
            <h3><img  alt= "" src={images[3]}/></h3>
            </div>
            <div>
            <h3><img  alt= "" src={images[2]}/></h3>
            </div>
            <div>
            <h3><img  alt= "" src={images[1]}/></h3>
            </div>
          </Slider>
        </div>
      );
    }
  }


// class ImageCarusel extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentImage: 1,
//       totalImages: 6,
//     };
//   }

//   getNextIndx() {
//     if (this.state.currentImage === 6) {
//       return 0;
//     } else {
//       return this.state.currentImage + 1;
//     }
//   }
//   compnentDidMount() {}

//   render() {
//     return (
//       <div className="carusel-main">
//         <div className="imageHolder">
//           <img className="carusel-image" src={images[0]} alt=""></img>
//         </div>
//         <div className="imageHolder">
//           <img className="carusel-image" src={images[1]} alt=""></img>
//         </div>
//         <div className="imageHolder">
//           <img className="carusel-image" src={images[2]} alt=""></img>
//         </div>
//         <div className="imageHolder">
//           <img className="carusel-image" src={images[3]} alt=""></img>
//         </div>
//         <div className="imageHolder">
//           <img className="carusel-image" src={images[2]} alt=""></img>
//         </div>
//         <div className="imageHolder">
//           <img className="carusel-image" src={images[1]} alt=""></img>
//         </div>
//       </div>
//     );
//   }
// }

// export default ImageCarusel;
