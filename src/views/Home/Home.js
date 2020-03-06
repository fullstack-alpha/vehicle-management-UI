import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card,
  Col,
  Row
} from "reactstrap";

import {
  Carousel
} from 'react-bootstrap'


import pass from "../../assets/img/home/1.jpg";
import ParkingSlotsIMG from "../../assets/img/home/2.jpg";
import ViolationIMG from "../../assets/img/home/3.jpg";

const items = [
  {
    src: pass,
    altText: "Slide 1",
    caption: "Vehicle Pass"
  },
  {
    src: ParkingSlotsIMG,
    altText: "Slide 2",
    caption: "Vehicle Parking"
  },
  {
    src: ViolationIMG,
    altText: "Slide 3",
    caption: "Parking Violation"
  }
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    // const slides = items.map(item => {
    //   return (
    //     <CarouselItem
    //       onExiting={this.onExiting}
    //       onExited={this.onExited}
    //       key={item.src}
    //     >
    //       <img className="d-block w-100" src={item.src} alt={item.altText} />
    //     </CarouselItem>
    //   );
    // });

    // const slides2 = items.map(item => {
    //   return (
    //     <CarouselItem
    //       onExiting={this.onExiting}
    //       onExited={this.onExited}
    //       key={item.src}
    //     >
    //       <img className="d-block w-100" src={item.src} alt={item.altText} />
    //       <CarouselCaption
    //         captionText={item.caption}
    //         captionHeader={item.caption}
    //       />
    //     </CarouselItem>
    //   );
    // });

    const imageSize ={
      width:'100%', 
      height: '600px'
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="12">
            <Card>
              <Carousel>
                { items.map((item, i)=>{
                  return (
                    <Carousel.Item key={i}>
                    <img
                      className="d-block w-100"
                      src={item.src}
                      alt={item.altText}
                      style={imageSize}
                    />
                    <Carousel.Caption>
                      <h3>{item.caption}</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                  )
                }
                ) }
                
              </Carousel>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
