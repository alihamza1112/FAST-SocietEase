import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function Example(props) {
  const [show, setShow] = useState(false);
  const [societyName, setSocietyName] = useState('');
  const [mentorName, setMentorName] = useState('');
  const [image, setImage] = useState(null);
  const handleRefresh = () => {
    window.location.reload();
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
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

    const title = societyName;
    const text = mentorName;
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
        //window.location.reload();
      } else {
        alert('Failed to add society.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
 const  LogOut=()=>{
   
    navigate('/loginPage');
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        +
      </Button>
      <Button variant="link"
  onClick={LogOut}
  style={{ textDecoration: 'none', color: 'red' }} >Logout</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Society</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="societyNameInput">
              <Form.Label>Society Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Here"
                autoFocus
                value={societyName}
                onChange={(e) => setSocietyName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="mentorNameInput">
              <Form.Label>Mentor Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Here"
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="imageInput">
              <Form.Label>Select Society Logo</Form.Label>
              <Form.Group>
              <input type="file" onChange={handleImageChange} accept="image/*" />
              </Form.Group>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={  (e) => { handleRefresh();handleClose(); handleSubmit(e); }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
