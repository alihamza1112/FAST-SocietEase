import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from './modal';
import EvenModel from './EventModel'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

function NavScrollExample(props)  {
  const { buttonOnClick, showModal } = props;
    const navigate = useNavigate();
   
    const handleRefresh = () => {
      window.location.reload();
    };
    const LogOut = () => {
      navigate('/loginPage');
    };
  return (
    
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container fluid>
      
        <Navbar.Brand href="#" onClick={handleRefresh} style={{  color: 'wheat' }}>FAST SocietEase</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          <Nav.Link as={NavLink} to="/MainPage" activeClassName="active-link">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/societypage" activeClassName="active-link">
              Societies
            </Nav.Link>
            <Nav.Link as={NavLink} to="/eventpage" activeClassName="active-link">
              Events
            </Nav.Link>

          </Nav>
          {props.button && <button onClick={buttonOnClick}>{props.button}</button>}
          
          {/* Conditionally render Modal based on showModal prop */}
          {showModal === 1 && <Modal />}
          {showModal === 2 &&  <EvenModel />}
          <Button variant="link"
  onClick={LogOut}
  style={{ textDecoration: 'none', color: 'red' }} >Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;