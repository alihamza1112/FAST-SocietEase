import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './mainPage.css';
function MainPage() {
  const navigate = useNavigate();

  const movepagefunction = ()=>{
    navigate('/societypage')
  };
  return (
    <body>
<div>
    <Carousel data-bs-theme="light" className='CI1'>
      <Carousel.Item className='CI'>
        <img
          className="d-block w-100"
          src="https://wallpapers.com/images/featured/ultra-hd-wazf67lzyh5q7k32.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item >
      <Carousel.Item className='CI'>
        <img
          className="d-block w-100"
          src="https://wallpapers.com/images/featured/ultra-hd-wazf67lzyh5q7k32.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='CI'>
        <img
          className="d-block w-100"
          src="https://wallpapers.com/images/featured/ultra-hd-wazf67lzyh5q7k32.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    {' '}
    </div>
    <div class="container-xl" id='yo' ><Button variant="outline-success" onClick={movepagefunction}>Success</Button>
    </div>

    </body>
  );
}

export default MainPage;