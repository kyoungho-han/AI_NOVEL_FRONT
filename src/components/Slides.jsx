import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import style from "../style/Slides.module.css";

function Slides() {
    return (
        <Carousel className={style.carousel}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="img/ai3.jpg"
                    alt="First slide"
                />
                <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="img/ai2.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="img/ai1.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Slides;
