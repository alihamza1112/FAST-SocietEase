import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import SocietyPage from './pages/Society/society';
import MainPage from './pages/MainPage/mainPage';
import ExecutiveBody from './pages/executive_body/executive_body';
import EventPage from './pages/Events/Event';
import EventData from './pages/EventData/EventData';
function App() {
    return (
        <BrowserRouter>
         <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/loginPage" element={<Login />} />
          <Route path="/societypage" element={<SocietyPage />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/executivebody" element={<ExecutiveBody />} />
          <Route path="/eventpage" element={<EventPage />} />
          <Route path="/eventdata" element={<EventData />} />
            </Routes>
            </BrowserRouter>
    );
}

export default App;