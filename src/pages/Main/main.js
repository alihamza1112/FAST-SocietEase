import React, { useState, useEffect } from 'react';
import './Main.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Main() {
  const [cardInfo, setCardInfo] = useState([]);
  const [image, setImage] = useState(null);

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

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = 'Ali Hamza';
    const text = 'First Second';
    const imageBase64 = await encodeImageToBase64(image);

    try {
      const response = await fetch('http://localhost:3001/society', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, text, imageBase64 }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh the page to fetch the updated data
        window.location.reload();
      } else {
        alert('Failed to add society.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderCard = (card, index) => {
    return (
      <Col key={index} className="p-4 mb-4">
        <Card className="mx-auto mb-3 p-3" style={{ width: '14rem' }}>
          <Card.Img variant="top" src={card.image.src} style={{ height: '150px' }} />
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.text}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
<body className='mainBody'>
    <div className="App">
      <input type="file" id="imageInput" onChange={handleImageChange} />
      <Button onClick={handleSubmit}>Submit</Button>
      <Row lg={4} md={3} sm={2} xs={1}>
        {cardInfo.map(renderCard)}
      </Row>
    </div>
    </body>
  );
}
