import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


function Slideshow({ tshirtData }) {


    const tshirtImages = tshirtData.map(tshirt => {
        return <div key={tshirt.id} ><img onClick={handleClick} id={tshirt.id} style={{width: "200px", height: "200px",}} src={tshirt.front_design} alt={tshirt.id}/></div>
    })

    function handleClick(e) {
      console.log("hi");
    }

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
        {tshirtImages}
    </Carousel>
    </div>
  )
}

export default Slideshow