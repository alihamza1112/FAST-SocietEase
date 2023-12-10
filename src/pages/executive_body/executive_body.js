import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Image, Dropdown, FormControl, InputGroup, Button } from 'react-bootstrap';

const ExecutiveBody = () => {
  const location = useLocation();
  const [selectedSociety, setSelectedSociety] = useState('');
  const [societies, setSocieties] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [societyLogo, setSocietyLogo] = useState('');
  const [executiveImage, setExecutiveImage] = useState('');
  const [mentorName, setMentorName] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const titleParam = queryParams.get('society_name');
    const textParam = queryParams.get('society_description');
    const imageParam = queryParams.get('society_logo');

    if (titleParam && textParam) {
      setTitle(decodeURIComponent(titleParam));
      setText(decodeURIComponent(textParam));
      setSocietyLogo(decodeURIComponent(imageParam));
    }

    // Fetch the list of societies from the server
    const fetchSocieties = async () => {
      try {
        const response = await fetch('http://localhost:3001/getsociety');
        const data = await response.json();
        setSocieties(data.data.map((card) => card.society_name));
      } catch (error) {
        console.error('Error fetching societies:', error);
      }
    };

    fetchSocieties();
  }, [location.search]);

  const handleSocietyChange = async (selectedSociety) => {
    try {
      const societyResponse = await fetch(`http://localhost:3001/getsocietybysearch?selectedSociety=${encodeURIComponent(selectedSociety)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const societyData = await societyResponse.json();

      if (societyData.data.length > 0) {
        const society = societyData.data[0];
        setTitle(society.society_name);
        setText(society.society_description);
        setSocietyLogo(`data:image/png;base64,${society.society_logo}`);
        setExecutiveImage(`data:image/png;base64,${society.executive_image}`);
        setMentorName(society.mentor_name);
        setMentorEmail(society.mentor_email);
      } else {
        console.log('Society not found');
      }

      // Fetch mentor data
      const mentorResponse = await fetch(`http://localhost:3001/getmentorbysociety?selectedSociety=${encodeURIComponent(selectedSociety)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const mentorData = await mentorResponse.json();

      if (mentorData.data.length > 0) {
        const mentor = mentorData.data[0];
        setMentorName(mentor.mentor_name);
        setMentorEmail(mentor.mentor_gmail);
        setExecutiveImage(`data:image/png;base64,${mentor.mentor_picture}`);
      }
    } catch (error) {
      console.error('Error fetching society and mentor data:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSocietyChange(selectedSociety);
    }
  };

  const filterSocieties = (input) => {
    return societies.filter((society) => society.toLowerCase().startsWith(input.toLowerCase()));
  };

  const handleMentorUpdate = async (selectedSociety) => {
    if (!selectedSociety) {
    
      console.error('Missing selected society');
      return;
    }
    try {
      // Check if mentor data exists
      const mentorResponse = await fetch(`http://localhost:3001/getmentorbysociety?selectedSociety=${encodeURIComponent(selectedSociety)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const mentorData = await mentorResponse.json();
  
      if (mentorData.data) {
        // Mentor data exists, update it
        const mentor = mentorData.data[0];
        updateMentorData(mentor.mentor_id);
      } else {
        // Mentor data doesn't exist, add it
        addMentorData(selectedSociety);
      }
    } catch (error) {
      console.error('Error checking mentor data:', error);
    }
  };
  
  const updateMentorData = async (mentorId) => {
    try {
      const response = await fetch(`http://localhost:3001/updatementor/${mentorId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mentorName,
          mentorEmail,
          mentorImage: executiveImage.split(',')[1], // Sending only the base64 part
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Mentor data updated successfully.');
      } else {
        console.log('Error updating mentor data.');
      }
    } catch (error) {
      console.error('Error updating mentor data:', error);
    }
  };
  
  const addMentorData = async (selectedSociety) => {
    try {
      const response = await fetch('http://localhost:3001/addmentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          societyName: selectedSociety,
          mentorName,
          mentorEmail,
          mentorImage: executiveImage.split(',')[1], // Sending only the base64 part
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Mentor data added successfully.');
      } else {
        console.log('Error adding mentor data.');
      }
    } catch (error) {
      console.error('Error adding mentor data:', error);
    }
  };
  

  return (
    <Container>
      <br />
      <Row className="mb-4">
        <Col>
          <InputGroup className="mb-3">
            <Dropdown onSelect={(society) => handleSocietyChange(society)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedSociety || 'Select Society'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {filterSocieties(selectedSociety).map((society) => (
                  <Dropdown.Item key={society} eventKey={society}>
                    {society}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <FormControl
              placeholder="Search Society"
              onChange={(e) => setSelectedSociety(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="text-left">
          <div className="mt-2">
            <h1>{title}</h1>
            <p className="society-description mb-4">{text}</p>
          </div>
        </Col>
        <Col className="text-center">
          <Image
            src={societyLogo}
            roundedCircle
            className="border border-secondary rounded-circle object-fit-contain mx-auto"
            style={{ height: '350px', width: '350px' }}
          />
        </Col>
      </Row>

      <Row className="mb-4 d-flex justify-content-center align-items-center">
        <Col xs={12} md={6} lg={4} className="text-center">
          <h2>Executive Body</h2>
          <div className="d-block mx-auto clickable-image">
            <label htmlFor="fileInput">
              <Image
                src={executiveImage}
                roundedCircle
                className="border border-secondary rounded-circle object-fit-contain mx-auto"
                style={{ height: '200px', width: '200px', cursor: 'pointer' }}
                alt="Executive Body"
              />
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setExecutiveImage(reader.result);
                  };
                  reader.readAsDataURL(selectedFile);
                }
              }}
            />
          </div>

          <div className="text-center mt-2">
            <p onDoubleClick={() => setEditingName(true)}>
              Name: {editingName ? <input type="text" value={mentorName} onChange={(e) => setMentorName(e.target.value)} onBlur={() => setEditingName(false)} /> : mentorName}
            </p>
            <p onDoubleClick={() => setEditingEmail(true)}>
              Email: {editingEmail ? <input type="text" value={mentorEmail} onChange={(e) => setMentorEmail(e.target.value)} onBlur={() => setEditingEmail(false)} /> : mentorEmail}
            </p>
            <p>Mentor</p>
            <Button onClick={() => handleMentorUpdate(title)}>Save Mentor Info</Button>
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
  );
};

export default ExecutiveBody;
