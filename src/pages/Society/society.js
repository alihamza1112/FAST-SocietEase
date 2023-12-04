import React, { useState, useEffect } from 'react';
import './Society.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from '../../components/navbar';
import { Link } from 'react-router-dom';

export default function Main() {
  const [cardInfo, setCardInfo] = useState([]);
  const linkStyle = {
    textDecoration: 'none',
  };
  useEffect(() => {
    fetch('http://localhost:3001/getsociety')
      .then((response) => response.json())
      .then((data) => {
        setCardInfo(data.data.map((card) => {
          const imageData = card.image;
          const image = new Image();
          image.onload = () => {
            card.image = image;
          };
          image.src = `data:image/png;base64,${imageData}`;
          return card;
        }));
      });
  }, []); // Fetch data on initial render

  const renderCard = (card, index) => {
    return (
      <Col key={index} className="p-4 mb-4">
        <Link
          to={{
            pathname: `/executivebody`,
            title: card.title,
            text: card.text,
          }}
          style={linkStyle}

        >
          <Card className="mx-auto mb-3 p-3" style={{ width: '14rem' }}>
            <Card.Img variant="top" src={card.image.src} style={{ height: '150px' }} />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.text}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    );
  };

  return (
    <body className="mainBody">
      <div className="App">
        <Nav />
        <Row lg={4} md={3} sm={2} xs={1}>
          {cardInfo.map(renderCard)}
        </Row>
      </div>
    </body>
  );
}
