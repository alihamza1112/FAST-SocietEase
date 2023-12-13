import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Example(props) {
  const [show, setShow] = useState(false);
  const [mentorName, setMentorName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [validated, setValidated] = useState(false); // State to track form validation

  const handleClose = () => {
    setShow(false);
    setValidated(false); // Reset validation state on modal close
  };

  const handleShow = () => setShow(true);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleRefresh = () => {
    window.location.reload();
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

  const addMentorData = async () => {
    try {
      const responseCheck = await fetch(`http://localhost:3001/getmentor?mentorname=${encodeURIComponent(mentorName)}`);
      const dataCheck = await responseCheck.json();
      if (dataCheck.exists) {
        alert('Mentor with the same name already exists. Please choose a different name.');
        return; // Exit the function if society name exists
      }
      const imageBase64 = await encodeImageToBase64(image);
      const response = await fetch('http://localhost:3001/addmentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          societyName: props.defaultSocietyName,
          mentorName,
          mentorEmail: email,
          mentorImage: imageBase64,
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


  const isValidGmail = (input) => {
    const allowedDomainsRegex = /@(cfd\.nu\.edu\.pk|nu\.edu\.pk)$/i;
    return allowedDomainsRegex.test(input);
  };

  const handleSaveChanges = () => {
    const form = document.getElementById('mentorForm');
    if (form.checkValidity()) {
      setValidated(false); // Reset validation state
      handleRefresh();
      handleClose();
      addMentorData();
    } else {
      setValidated(true); // Set validation state to display error messages
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Mentor
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Mentor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="mentorForm"
            noValidate
            validated={validated}
          >
            <Form.Group className="mb-3" controlId="mentorNameInput">
              <Form.Label>Mentor name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Here"
                autoFocus
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
                required
              />
            </Form.Group>
            

            <Form.Group controlId="emailInput">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Here"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!isValidGmail(email)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid Gmail address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="imageInput">
              <Form.Label>Select Mentor picture</Form.Label>
              <Form.Group>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                />
              </Form.Group>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
