import React, { useState, useEffect } from 'react';
import './Society.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from '../../components/navbar';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import UpdateModal from '../../components/UpdateModel';

export default function Main() {
  const [cardInfo, setCardInfo] = useState([]);

  const linkStyle = {
    textDecoration: 'none',
  };

  useEffect(() => {
    fetch('http://localhost:3001/getsociety')
      .then((response) => response.json())
      .then((data) => {
        setCardInfo(
          data.data.map((card) => {
            const imageData = card.image;
            const image = new Image();
            image.onload = () => {
              card.image = image;
            };
            image.src = `data:image/png;base64,${imageData}`;
            return card;
          })
        );
      });
  }, []); // Fetch data on initial render

  const deleteCard = async (title) => {
    try {
      const response = await fetch('http://localhost:3001/Delsociety', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      const data = await response.json();

      if (data.success) {
        // Handle successful deletion (e.g., update state or UI)
        alert('Delete Society Successfully');

        // Reload the page after successful deletion
        window.location.reload();
      } else {
        alert('Failed to delete society.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderCard = (card, index) => {
    return (
      <Col key={index} className="p-4 mb-4">
        <Card className="mx-auto mb-3 p-3" style={{ width: '14rem' }}>
          <Link
            to={`/executivebody?title=${encodeURIComponent(card.title)}&text=${encodeURIComponent(
              card.text
            )}&image=${encodeURIComponent(card.image.src)}`}
            style={linkStyle}
          >
            <Card.Img variant="top" src={card.image.src} style={{ height: '150px' }} />
          </Link>
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.text}</Card.Text>
            <Button variant="danger" className="CardBtn" onClick={() => deleteCard(card.title)}>
              Delete
            </Button>
            <UpdateModal
          defaultSocietyName={card.title}
          defaultMentorName={card.text}
        />
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <body className="mainBody">
      <div className="App">
        <Nav />
        <Row lg={4} md={3} sm={2} xs={1} style={{ flexGrow: '0' }}>
          {cardInfo.map(renderCard)}
        </Row>
      </div>
    </body>
  );
}
