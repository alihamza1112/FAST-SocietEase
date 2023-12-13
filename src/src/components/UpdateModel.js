import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
function Example(props) {
  const [show, setShow] = useState(false);
  const [societyName, setSocietyName] = useState(props.defaultSocietyName || '');
  const [description, setDescription] = useState(props.defaultSocietyDescription ||'');
  const [image, setImage] = useState(null);
  const [validated, setValidated] = useState(false); // State to track form validation
  const alreadysociety=props.defaultSocietyName;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

    const title = societyName;
    const imageBase64 = await encodeImageToBase64(image);

    try {
      const responseCheck = await fetch(`http://localhost:3001/checksociety?updateSociety=${encodeURIComponent(title)}&alreadysociety=${encodeURIComponent(alreadysociety)}`);
      const dataCheck = await responseCheck.json();
      if (dataCheck.exists) {
        alert('Society with the updated name already exists. Please choose a different name.');
        return; // Exit the function if society name exists
      }
      const response = await fetch('http://localhost:3001/updatesociety', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title,description ,alreadysociety, imageBase64 }),
      });

      const data = await response.json();

      if (data.success) {
      } else {
        alert('Failed to add society.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleSaveChanges = () => {
    const form = document.getElementById('societyForm');
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
        Update
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a Society</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form
            id="societyForm"
            noValidate
            validated={validated}
          >
            <Form.Group className="mb-3" controlId="societyNameInput">
              <Form.Label>Updated Society Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Here"
                autoFocus
                value={societyName}
                onChange={(e) => setSocietyName(e.target.value)}
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
              <Form.Label>Select Society Logo</Form.Label>
              <Form.Group>
              <input type="file" onChange={handleImageChange} accept="image/*" required />
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
