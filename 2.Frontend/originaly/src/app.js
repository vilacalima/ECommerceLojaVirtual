import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importe o CSS da biblioteca
import { Carousel } from 'react-responsive-carousel';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function App() {
    const history = useHistory();

    useEffect(() => {
      const token = Cookies.get('token');
      if (token) {
        history.push(`/home/${false}`);
      }
    }, []);

    return (
      <div style={{ display: 'block', width: 700, padding: 30 }}>
        <h4>React-Bootstrap Carousel Component</h4>
        <Carousel>
          <Carousel.Item interval={1500}>
            <img
              className="d-block w-100"
  src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
              alt="Image One"
            />
            <Carousel.Caption>
              <h3>Label for first slide</h3>
              <p>Sample Text for Image One</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100"
  src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
              alt="Image Two"
            />
            <Carousel.Caption>
              <h3>Label for second slide</h3>
              <p>Sample Text for Image Two</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }