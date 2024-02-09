import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AppointmentHistory from './Service/AppointHistory';
import TechnicianList from './Service/TechList';
import TechnicianForm from './Service/TechForm';
import AppointmentForm from './Service/AppointForm';
import AppointmentList from './Service/AppointList';
import AutomobileForm from './Inventory/AutoForm';
import AutomobileList from './Inventory/AutoList';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="create" element={<AutomobileForm />} />
          </Route>
          <Route path="technicians">
            <Route index element={<TechnicianList />} />
            <Route path="create" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentList />} />
            <Route path="create" element={<AppointmentForm />} />
            <Route path="history" element={<AppointmentHistory />} />
          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
