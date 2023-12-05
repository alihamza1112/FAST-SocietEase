import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';

export default function ExecutiveBody() {
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setimage] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const titleParam = queryParams.get('title');
    const textParam = queryParams.get('text');
    const imageParam = queryParams.get('image');

    if (titleParam && textParam) {
      setTitle(decodeURIComponent(titleParam));
      setText(decodeURIComponent(textParam));
      setimage(decodeURIComponent(imageParam));
    }
  }, [location.search]);

  if (!title || !text || !image) {
    return <div>Error: Missing title or text or image</div>;
  }

  return (
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
              <p>Name: Ali Hamza</p>
              <p>Email: alihamza@example.com</p>
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
              <p>Name: Ali Hamza {index}</p>
              <p>Email: Ali{index}@example.com</p>
              <p>Category: Category {index}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
