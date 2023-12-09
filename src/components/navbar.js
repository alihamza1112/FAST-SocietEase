import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from './modal';
import { useNavigate } from 'react-router-dom';
function NavScrollExample(props)  {
    const { buttonOnClick } = props;
    const navigate = useNavigate();
    const movepagefunction1 = ()=>{
      navigate('/MainPage')
    };
    const movepagefunction2 = ()=>{
      navigate('/eventpage')
    };
    const handleRefresh = () => {
      window.location.reload();
    };
  return (
    
    <Navbar  expand="lg" className="bg-body-tertiary">
      <Container fluid>
      
        <Navbar.Brand href="#" onClick={handleRefresh}>FAST SocietEase</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={movepagefunction1}>Home</Nav.Link>
            <Nav.Link  onClick={movepagefunction2}>Events</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          {props.button && <button onClick={buttonOnClick}>{props.button}</button>}

          <Modal/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;