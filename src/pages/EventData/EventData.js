import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './EventData.css';

function EventData() {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventPic, setEventPic] = useState(null);
  const [cardInfo, setCardInfo] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get('event_name');
    const eventDescription = urlParams.get('event_description');
    setEventName(eventName);
    setEventDescription(eventDescription);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/geteventdata');
        const data = await response.json();

        const cardData = await Promise.all(
          data.data.map(async (card) => {
            const imageData = card.event_data;
            const image = new Image();

            await new Promise((resolve) => {
              image.onload = () => {
                card.event_data = image;
                resolve();
              };
              image.src = `data:image/png;base64,${imageData}`;
            });

            return card;
          })
        );

        setCardInfo(cardData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setEventPic(file);
  };

  const encodeImageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result.split(',')[1];
        resolve(base64Image);
      };
      reader.onerror = () => {
        reject('Error encoding image to base64');
      };
      reader.readAsDataURL(image);
    });
  };

  const handleUpload = async () => {
    try {
      const imageBase64 = await encodeImageToBase64(eventPic);
      const response = await fetch('http://localhost:3001/addeventdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName: eventName,
          eventDescription: eventDescription,
          eventImage: imageBase64,
        }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.reload();
        console.log('Event data added successfully.');
      } else {
        console.log('Error adding event data.');
      }
    } catch (error) {
      console.error('Error adding event data:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalShow = (index) => {
    setExpandedIndex(index);
    setShowModal(true);
  };

  const renderCard = (card, index) => {
   
  
    return (
      <Col key={index} className="p-4 mb-4">
        <Card className="mx-auto mb-3 p-3" id='CardSty' style={{ width: '14rem' }} onClick={() => handleModalShow(index)}>
            <Card.Img variant="top" src={card.event_data.src} style={{ height: '150px' }} />
        </Card>
      </Col>
    );
  };
  

  return (
    <div className="eventData">
      <h1>Event Information</h1>
      <Row className="mb-4">
        <Col className="text-left">
          <div className="event-name" style={{ marginLeft: '10px' }}>
            <h3>{eventName}</h3>
          </div>
        </Col>
        <Col className="text-right">
          <div className="event-options">
            <form onSubmit={(e) => handleUpload(e)}>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button type="submit">Upload</button>
            </form>
          </div>
        </Col>
      </Row>
      <hr />
      <div className="event-description">
        <p style={{ textAlign: 'center' }}>{eventDescription}</p>
      </div>
      <Row lg={4} md={3} sm={2} xs={1}>
        {cardInfo.map(renderCard)}
      </Row>

      {/* Modal for enlarged image */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Body>
          {expandedIndex !== null && (
            <img
              src={cardInfo[expandedIndex].event_data.src}
              alt={`Enlarged ${eventName}`}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EventData;
