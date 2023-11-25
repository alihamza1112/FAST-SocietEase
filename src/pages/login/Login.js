import './Login.css';
import { useNavigate } from 'react-router-dom';
export default function Header(props) {
 
  const navigate = useNavigate();

  /*const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    try {
      const response = await fetch('http://localhost:3001/addAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Admin added successfully!');
      } else {
        console.error('Failed to add admin.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
  
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        
        alert('Login successful!'); 
        navigate('/main');
        
      } else {
       
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <>
    <body className='loginBody'>
      <div className="container-xl">
        <div className="row align-items-start">
          <div className="col">
            <h2>Admin Login</h2><br/>
            <form onSubmit={handleSubmit}>
              
              <input id="loginInput" name="username" placeholder="Enter UserName " />
              <br />
              <input id="loginInput" name="password" type="password" placeholder="Enter Password" />
              <br />
              <button id="loginbtn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      </body>
    </>
  );
}


