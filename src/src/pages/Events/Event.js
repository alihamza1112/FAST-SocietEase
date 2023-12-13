import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './Event.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from '../../components/navbar';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Event() {
    const [cardInfo, setCardInfo] = useState([]);

    const linkStyle = {
      textDecoration: 'none',
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/getevent');
          const data = await response.json();
    
          // Load images asynchronously
          const cardData = await Promise.all(
            data.data.map(async (card) => {
              const imageData = card.event_logo;
              const image = new Image();
    
              // Wrap image loading in a promise
              await new Promise((resolve) => {
                image.onload = () => {
                  card.event_logo = image;
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
  
    const deleteCard = async (event_name) => {
      try {
        const response = await fetch('http://localhost:3001/Delevent', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ event_name }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          // Handle successful deletion (e.g., update state or UI)
          alert('Delete event Successfully');
  
          // Reload the page after successful deletion
          window.location.reload();
        } else {
          alert('Failed to delete event.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const renderCard = (card, index) => {
      return (
        <Col key={index} className="p-4 mb-4">
          <Card className="mx-auto mb-3 p-3" id='CardSty' style={{ width: '14rem' }}>
            <Link
              to={`/EventData?event_name=${encodeURIComponent(card.event_name)}&event_description=${encodeURIComponent(
                card.event_description
              )}`}
              style={linkStyle}
            >
              <Card.Img variant="top" src={card.event_logo.src} style={{ height: '150px' }} />
            </Link>
            <Card.Body className="text-center">
              <Card.Title>{card.event_name}</Card.Title>
              <Button variant="danger" className="CardBtn" onClick={() => deleteCard(card.event_name)}>
                Delete
              </Button>
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
