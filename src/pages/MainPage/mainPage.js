import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './mainPage.css';
import { Container, Row, Col, Image } from 'react-bootstrap';

function MainPage() {
  const navigate = useNavigate();

  const movepagefunction = ()=>{
    navigate('/societypage')
  };
  return (
    <body>
    <Carousel data-bs-theme="light" >
      <Carousel.Item className='CI'>
        <img
          className="d-block w-100"
          src="https://lh3.googleusercontent.com/pw/ADCreHd_yXyDdPwysnopIJ09YRCgt_meIdvF_vMfqLAfKM8CLolvZEV2r659NpCPEfzMdZFVethQKymp9NKr_XoHx4NgO1sVS1wS9UVRGAX5DSe9NlVrJo0ycvRLBjkdyNDnPTZrEm4_ZfrCUP5fQpxWgMc=w1186-h667-s-no-gm"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>Fast Photography Society</h5>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item >
      <Carousel.Item className='CI'>
        <img
          className="d-block w-100"
          src="https://lh3.googleusercontent.com/pw/ADCreHdtLraEQPY7U6U9EbU9o1gjtE9Fhc4OebI4JsOW8ZWGq_Bvvo5WoHwmIAI7MLBNhXFbpFsEdq6OMTfFGkODhDsU13Zbf7X16RDbiSAJS3HSkOvXQj8GkG86BGir9gWdJncNGkzUxE5XA8xn9W135lM=w1186-h667-s-no-gm"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Software Engineering Society</h5>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='CI'>
        <img
          className="d-block w-100"
          src="https://lh3.googleusercontent.com/pw/ADCreHekvwQw_tzq5Um1xvDBg3mWkz2nj-xj-kmASYDTTs_4tG2CPdtZkn072apRGin2FBpDX70ulE-yKHfvjmmTGmr-zzwVBc5151VqNNCE5_sak90jH7UGYZrnEIZoieOay_F2p4L2020kIYTwFzvMOoU=w1186-h667-s-no-gm"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Dramocrats</h5>
          <p>
            
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    {' '}
    <div  id='yo' ><Button variant="outline-success" onClick={movepagefunction}>Welcome to FAST SocietEase</Button>
    </div>
<br></br>

    <Container>
      {/* Top of the page with responsive image */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-center align-items-center">
          <Image src="https://www.imagelighteditor.com/img/bg-after.jpg" fluid style={{ height: '40vh', width: '100%', objectFit: 'cover' }} />
        </Col>
      </Row>

      {/* Text about the society */}
      <Row className="mb-4">
        <Col>
          <p style={{ color: 'black' }}>The Software Engineering Society is an initiative aimed at bridging the gap between industry and academia in the field of software engineering. The society was created with the goal of creating a platform for collaboration and communication between industry professionals and academics, to foster innovation and advance the field of software engineering. Software engineering is a rapidly evolving field, with new technologies and best practices emerging at an unprecedented pace. However, there is often a gap between the knowledge and skills that are taught in academia and the practical skills and knowledge required in the industry</p>
        </Col>
      </Row>

      {/* Circle image with name, email, category */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-center align-items-center">
          <div className="text-center">
            <Image src="https://www.imagelighteditor.com/img/bg-after.jpg" roundedCircle fluid style={{ height: '80px', width: '80px', objectFit: 'cover' }} />
            <div className="mt-2">
              <p>Name: Mustajab</p>
              <p>Email: mustajab@example.com</p>
              <p>Category: Executive</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Two columns, eight rows with circle image and text */}
      <Row>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <Col key={index} xs={6} sm={3} className="mb-4 d-flex flex-column align-items-center">
            <Image src={`https://www.imagelighteditor.com/img/bg-after.jpg`} roundedCircle fluid style={{ height: '80px', width: '80px', objectFit: 'cover' }} />
            <div className="mt-2 text-center">
              <p>Name: Mustajab {index}</p>
              <p>Email: mustajab{index}@example.com</p>
              <p>Category: Category {index}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
    </body>
  );
}

export default MainPage;