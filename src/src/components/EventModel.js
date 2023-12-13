import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function EventModel(props) {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false); // State to track form validation
  const handleRefresh = () => {
    window.location.reload();
  };
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

  const handleSubmit = async () => {

    const title = eventName;
    const imageBase64 = await encodeImageToBase64(image);

    try {
      const responseCheck = await fetch(`http://localhost:3001/geteventbysearch?selectedevent=${encodeURIComponent(eventName)}`);
      const dataCheck = await responseCheck.json();
      if (dataCheck.exists) {
        alert('Event with the same name already exists. Please choose a different name.');
        return; 
      }
      const response = await fetch('http://localhost:3001/addevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, imageBase64,description }),
      });

      const data = await response.json();

      if (data.success) {
      } else {
        alert('Failed to add event.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleSaveChanges = () => {
    const form = document.getElementById('eventForm');
    if (form.checkValidity()) {
      setValidated(false); // Reset validation state
      handleRefresh();
      handleClose();
      handleSubmit();
    } else {
      setValidated(true); // Set validation state to display error messages
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Event
      </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add an Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form
            id="eventForm"
            noValidate
            validated={validated}
          >
            <Form.Group className="mb-3" controlId="societyNameInput">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Here"
                autoFocus
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="descriptionInput">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Description Here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="imageInput">
              <Form.Label>Select Event Logo</Form.Label>
              <Form.Group>
              <input type="file" onChange={handleImageChange} accept="image/*" required/>
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

export default EventModel;
