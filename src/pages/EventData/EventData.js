import './EventData.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Nav from '../../components/navbar'
function EventData() {

  
  return (
    <body>
      <Nav/>
    
    {' '}
    
<br></br>

    <Container>
      {/* Top of the page with responsive image */}
      

      {/* Text about the society */}
      <Row className="mb-4">
        <Col>
          <p style={{ color: 'black' }}>The Software Engineering Society is an initiative aimed at bridging the gap between industry and academia in the field of software engineering. The society was created with the goal of creating a platform for collaboration and communication between industry professionals and academics, to foster innovation and advance the field of software engineering. Software engineering is a rapidly evolving field, with new technologies and best practices emerging at an unprecedented pace. However, there is often a gap between the knowledge and skills that are taught in academia and the practical skills and knowledge required in the industry</p>
        </Col>
      </Row>

      {/* Circle image with name, email, category */}
      

      {/* Two columns, eight rows with circle image and text */}
      <Row>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <Col key={index} xs={6} sm={3} className="mb-4 d-flex flex-column align-items-center">
<Image src={`https://www.imagelighteditor.com/img/bg-after.jpg`} fluid style={{ height: '300px', width: '500px', objectFit: 'cover' }} />
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

export default EventData;