import Carousel from 'react-bootstrap/Carousel';
import './mainPage.css';
import NAV from "../../components/navbar"

function MainPage() {

  return (
    <body>
      <NAV/>
    <Carousel data-bs-theme="light" interval={12000}>

    <Carousel.Item className='CI'>
  <video className="img-fluid" autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
    <source src="/societease.mp4" type="video/mp4" />
  </video>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className='CI'>
        <img
          className="d-block w-100"
          src="https://lh3.googleusercontent.com/pw/ADCreHeqawi8AOU8Agj3nNP4kNG3GSnO0IfbuKmN_9xFRdPzvNAdF048oVYQqP9tjlu5iy348b0fQzkff17tXWYuhXN_VkISV4x_YtFpexuCl0yZRBjXestLNnheJ_cia32vrtv4zDps9GMWkP67BO4HXRg=w1186-h667-s-no-gm"
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item >
      <Carousel.Item className='CI'>
        <img
          className="d-block w-100"
          src="https://lh3.googleusercontent.com/pw/ADCreHes-obmgcmO73KmBTULr6GWGRNPWJ2qKGW3rp3eFj1lFvdWUut5oHasoIKvelPHC6hwk95Ah2NWxrgex9FAD_X6h8GwRDS45TSz9-hpTH6uytBJvKga4SvpP3aOrh67J9TnAaHDfY_nYa-Vx2zGty0=w1186-h667-s-no-gm"
          alt="Second slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='CI'>
        <img 
          className="d-block w-100"
          src="https://lh3.googleusercontent.com/pw/ADCreHfmTV_W_E0bfVJML7qKfhgU9Nks6-3J92-O-3GoEXPZwA_w8sJvap0V2FX643dwL1XFoDTmtjyJTa-ju6_0lqRB3nB8TvY3XTdIfEHPElkz6CZy4cp80u8AUJ_cmJFbBP5m3TUnv4p9PiglFmsEnK8=w1186-h667-s-no-gm"
          alt="Third slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
     
    </Carousel>
    {' '}
    <div id="yo">
     <p>Welcome to FAST SocietEase, Fast SocietEase is a university societies management system. FAST SocietEase is handling society information and event details throughout the year a breeze. With its user-friendly interface, you can easily register societies, save essential information, and plan events effortlessly. Stay organized and enhance communication within your university community. Experience the simplicity of Fast SocietEase and elevate your society management system.</p>
    </div>

    </body>
  );
  }
export default MainPage;