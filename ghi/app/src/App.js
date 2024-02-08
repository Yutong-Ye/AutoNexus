import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import SalesPeopleList from './SalesPeopleList';
import SalesPersonForm from './SalesPersonForm';
import SalesList from './SalesList';
import SaleForm from './SaleForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelList from './VehicleModelList';
import VehicleModelForm from './VehicleModelForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/api/customers/" element={<CustomerList />} />
          <Route path="/api/customers/new/" element={<CustomerForm />} />
          <Route path="/api/salespeople/" element={<SalesPeopleList />} />
          <Route path="/api/salespeople/new/" element={<SalesPersonForm />} />
          <Route path="/api/sales/" element={<SalesList />} />
          <Route path="/api/sales/new" element={<SaleForm />} />
          <Route path="/api/manufacturers/" element={<ManufacturerList />}/>
          <Route path="/api/manufacturers/new/" element={<ManufacturerForm />} />
          <Route path="/api/models/" element={<VehicleModelList />} />
          <Route path="/api/models/new/" element={<VehicleModelForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
