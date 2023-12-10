import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './Event.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from '../../components/navbar';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import UpdateModal from '../../components/UpdateModel';

export default function Event() {
    const [cardInfo, setCardInfo] = useState([]);

    const linkStyle = {
      textDecoration: 'none',
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/getsociety');
          const data = await response.json();
    
          // Load images asynchronously
          const cardData = await Promise.all(
            data.data.map(async (card) => {
              const imageData = card.image;
              const image = new Image();
    
              // Wrap image loading in a promise
              await new Promise((resolve) => {
                image.onload = () => {
                  card.image = image;
                  resolve();
                };
                image.src =  `data:image/png;base64,${imageData}`;
              });
    
              return card;
            })
          );
    
          // Update state after all images are loaded
          setCardInfo(cardData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData(); // Call the fetchData function
    }, []); // Fetch data on initial render
  
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
          <Nav showModal={2}/>
          <h1 className='eventh1'>Events</h1>
          <Row lg={4} md={3} sm={2} xs={1} >
            {cardInfo.map(renderCard)}
          </Row>
        </div>
      </body>
    );
}
