import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Button } from "@chakra-ui/react";

import SlideshowImage from './SlideshowImage';

function Slideshow({ tshirtData }) {


console.log(tshirtData);
    const responsive = {
        desktop: {
          breakpoint: { max: 5000, min: 1024 },
          items: 4,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };

    


  return (
    <>
        <h1 className="hline-galleries">T-studio Collections</h1>
        <div className='slideshow'>
        <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
        {tshirtData.map(tshirt => {
        return <SlideshowImage key={tshirt.id} tshirt={tshirt} />
    })}
        </Carousel>
        </div>
        <div className="navigate-container">
            <h1 className="navigate">got some inspiration?</h1>
            <Button className='jump-btn'>
                <Link to="/new" >
                    START
                </Link>
            </Button>
        </div>
    </>
  )
}

export default Slideshow